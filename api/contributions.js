// /api/contributions.js
// Vercel Serverless Function — fetches contribution data from GitHub's
// official GraphQL API server-side, so the token never reaches the browser
// and the frontend never has to depend on a flaky third-party proxy.

export default async function handler(req, res) {
  const username = req.query.username || process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }
  if (!token) {
    return res.status(500).json({ error: 'Server missing GITHUB_TOKEN env var' });
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const ghRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    if (!ghRes.ok) {
      const text = await ghRes.text();
      return res.status(ghRes.status).json({ error: 'GitHub API error', detail: text });
    }

    const json = await ghRes.json();

    if (json.errors) {
      return res.status(502).json({ error: 'GitHub GraphQL error', detail: json.errors });
    }

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return res.status(404).json({ error: 'No contribution data found for this user' });
    }

    // Flatten weeks -> days into a simple array the frontend can consume directly.
    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      }))
    );

    // Cache at the edge for an hour — contribution data doesn't need to be
    // real-time, and this saves your GitHub token's rate limit.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    return res.status(200).json({
      totalContributions: calendar.totalContributions,
      days,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}
