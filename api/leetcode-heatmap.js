// /api/leetcode-heatmap.js
// Vercel Serverless Function — fetches submission calendar + solve stats
// from LeetCode's own (unofficial but public) GraphQL API, server-side.
// LeetCode blocks CORS for browser requests, so this must run on the server.

export default async function handler(req, res) {
  const username = req.query.username || process.env.LEETCODE_USERNAME;

  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submissionCalendar
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;

  try {
    const lcRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // LeetCode's edge sometimes rejects requests with no browser-like
        // headers, so we set these to look like a normal page load.
        'Referer': `https://leetcode.com/${username}/`,
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioSite/1.0)',
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!lcRes.ok) {
      const text = await lcRes.text();
      return res.status(lcRes.status).json({ error: 'LeetCode API error', detail: text });
    }

    const json = await lcRes.json();

    if (json.errors) {
      return res.status(502).json({ error: 'LeetCode GraphQL error', detail: json.errors });
    }

    const matchedUser = json.data?.matchedUser;
    if (!matchedUser) {
      return res.status(404).json({ error: 'No LeetCode user found for this username' });
    }

    // submissionCalendar comes back as a JSON string: { "<unixTimestampSeconds>": count }
    const calendarRaw = matchedUser.submissionCalendar
      ? JSON.parse(matchedUser.submissionCalendar)
      : {};

    const days = Object.entries(calendarRaw).map(([timestamp, count]) => ({
      date: new Date(Number(timestamp) * 1000).toISOString().split('T')[0],
      count: Number(count),
    }));

    // Build easy/medium/hard breakdown from acSubmissionNum
    const acNums = matchedUser.submitStats?.acSubmissionNum || [];
    const totalsByDifficulty = json.data?.allQuestionsCount || [];

    const findCount = (arr, difficulty) =>
      arr.find((x) => x.difficulty === difficulty)?.count || 0;

    const breakdown = {
      easy: { solved: findCount(acNums, 'Easy'), total: findCount(totalsByDifficulty, 'Easy') },
      medium: { solved: findCount(acNums, 'Medium'), total: findCount(totalsByDifficulty, 'Medium') },
      hard: { solved: findCount(acNums, 'Hard'), total: findCount(totalsByDifficulty, 'Hard') },
    };

    const totalSolved = findCount(acNums, 'All');
    const ranking = matchedUser.profile?.ranking ?? null;

    const contest = json.data?.userContestRanking
      ? {
          rating: Math.round(json.data.userContestRanking.rating || 0),
          globalRanking: json.data.userContestRanking.globalRanking,
          attendedContests: json.data.userContestRanking.attendedContestsCount,
        }
      : null;

    // Cache for an hour — this data doesn't need to be second-by-second fresh.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    return res.status(200).json({
      username: matchedUser.username,
      totalSolved,
      ranking,
      contest,
      breakdown,
      days,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}
