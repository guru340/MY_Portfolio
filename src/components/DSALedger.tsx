import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Star, Trophy, Award } from 'lucide-react';

const LEETCODE_USERNAME = 'gurusangwani06';

interface DayData {
  date: Date;
  count: number;
  level: number;
  dayOfWeek: number;
}

export default function DSALedger() {
  const [stats, setStats] = useState({
    totalSolved: 0,
    contestRating: 0,
    ranking: null as number | null,
  });
  const [breakdown, setBreakdown] = useState({
    easy: { solved: 0, total: 0 },
    medium: { solved: 0, total: 0 },
    hard: { solved: 0, total: 0 },
  });
  const [hoveredDay, setHoveredDay] = useState<{
    date: Date; count: number; x: number; y: number;
  } | null>(null);
  const [loadError, setLoadError] = useState(false);

  const generateEmptyCalendar = () => {
    const data: DayData[] = [];
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 364);
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);
    for (let i = 0; i < 371; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      data.push({ date, count: 0, level: 0, dayOfWeek: date.getDay() });
    }
    return data;
  };

  const [calendarData, setCalendarData] = useState<DayData[]>(() => generateEmptyCalendar());

  useEffect(() => {
    fetch(`/api/leetcode-heatmap?username=${LEETCODE_USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error('LeetCode fetch failed');
        return res.json();
      })
      .then((apiData) => {
        setStats({
          totalSolved: apiData.totalSolved || 0,
          contestRating: apiData.contest?.rating || 0,
          ranking: apiData.ranking,
        });
        setBreakdown(apiData.breakdown);

        const dayMap = new Map<string, number>();
        (apiData.days || []).forEach((d: { date: string; count: number }) => {
          dayMap.set(d.date, d.count);
        });

        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 364);
        const startDay = startDate.getDay();
        startDate.setDate(startDate.getDate() - startDay);

        const aligned: DayData[] = [];
        for (let i = 0; i < 371; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          const count = dayMap.get(dateStr) ?? 0;

          let level = 0;
          if (count === 0) level = 0;
          else if (count <= 2) level = 1;
          else if (count <= 4) level = 2;
          else if (count <= 6) level = 3;
          else level = 4;

          aligned.push({ date, count, level, dayOfWeek: date.getDay() });
        }
        setCalendarData(aligned);
      })
      .catch((err) => {
        console.warn('Could not load live LeetCode stats.', err);
        setLoadError(true);
      });
  }, []);

  const weekMonths = useMemo(() => {
    const labels: (string | null)[] = [];
    let lastMonth = '';
    for (let week = 0; week < 53; week++) {
      const dayIndex = week * 7;
      if (dayIndex < calendarData.length) {
        const date = calendarData[dayIndex].date;
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        if (monthName !== lastMonth) {
          labels.push(monthName);
          lastMonth = monthName;
        } else {
          labels.push(null);
        }
      } else {
        labels.push(null);
      }
    }
    return labels;
  }, [calendarData]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: DayData) => {
    const cell = e.currentTarget;
    setHoveredDay({
      date: day.date,
      count: day.count,
      x: cell.offsetLeft + cell.offsetWidth / 2,
      y: cell.offsetTop,
    });
  };

  const difficulties = [
    { label: 'Easy', count: breakdown.easy.solved, total: breakdown.easy.total, bg: 'bg-emerald-500', accent: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Medium', count: breakdown.medium.solved, total: breakdown.medium.total, bg: 'bg-amber-500', accent: 'text-amber-600 dark:text-amber-400' },
    { label: 'Hard', count: breakdown.hard.solved, total: breakdown.hard.total, bg: 'bg-rose-500', accent: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="flex flex-col gap-4 mt-6" id="dsa-ledger-container">
      <div className="flex items-center justify-between" id="dsa-header">
        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-extrabold text-gray-900 dark:text-white tracking-wider uppercase">Problem Solving</span>
          <div className="h-px w-16 bg-warm-border/60" />
        </div>
        <a
          href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase hover:underline"
        >
          LeetCode Stats
        </a>
      </div>

      <div className="p-6 bg-warm-card border border-warm-border rounded-3xl shadow-xs flex flex-col gap-5 transition-all duration-300" id="dsa-card">

        {loadError && (
          <p className="text-[10px] text-gray-400 font-mono">Live stats unavailable right now — showing last known layout.</p>
        )}

        {/* Core Competitive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="competitive-stats-grid">
          <div className="p-4 bg-white dark:bg-[#0c0c0c]/40 border border-warm-border dark:border-neutral-800/80 rounded-2xl flex items-center justify-between" id="total-solved-card">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Total Solved</span>
              <span className="text-xl font-black text-gray-950 dark:text-white tracking-tight">{stats.totalSolved}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-3xs">
              <Trophy className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-[#0c0c0c]/40 border border-warm-border dark:border-neutral-800/80 rounded-2xl flex items-center justify-between" id="contest-rating-card">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1">
                Contest Rating
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              </span>
              <span className="text-xl font-black text-gray-950 dark:text-white tracking-tight">{stats.contestRating || '—'}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-3xs">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-[#0c0c0c]/40 border border-warm-border dark:border-neutral-800/80 rounded-2xl flex items-center justify-between" id="global-rank-card">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Global Rank</span>
              <span className="text-xl font-black text-gray-950 dark:text-white tracking-tight">
                {stats.ranking ? `#${stats.ranking.toLocaleString()}` : '—'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-3xs">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="flex flex-col gap-3" id="difficulty-breakdown-section">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Solved Problems Breakdown</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" id="difficulty-cards-container">
            {difficulties.map((diff) => {
              const percent = diff.total ? Math.round((diff.count / diff.total) * 100) : 0;
              return (
                <div key={diff.label} className="p-4 bg-white dark:bg-[#0c0c0c]/20 border border-warm-border rounded-2xl flex flex-col gap-2.5 hover:shadow-2xs transition-all duration-300" id={`diff-card-${diff.label.toLowerCase()}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gray-900 dark:text-white">{diff.label}</span>
                    <span className={`text-xs font-mono font-bold ${diff.accent}`}>
                      {diff.count} <span className="text-gray-300 font-medium">/</span> {diff.total}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full ${diff.bg}`} initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1 }} />
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-400">
                    <span>Solved Ratio</span>
                    <span className="font-bold">{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Submission Heatmap */}
        <div className="flex flex-col gap-3 border-t border-warm-border/40 pt-5" id="leetcode-heatmap-section">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Submission Activity</span>
          <div className="relative w-full overflow-x-auto select-none pb-2 scrollbar-thin" id="leetcode-heatmap-scroll">
            <div className="flex gap-[3px] min-w-max relative py-1" id="leetcode-heatmap-inner">
              <div className="flex flex-col gap-[3px] text-[8px] font-mono text-gray-400 w-5 shrink-0 justify-between select-none pr-1 mt-4">
                <span className="h-[10px] leading-none flex items-center"></span>
                <span className="h-[10px] leading-none flex items-center">M</span>
                <span className="h-[10px] leading-none flex items-center"></span>
                <span className="h-[10px] leading-none flex items-center">W</span>
                <span className="h-[10px] leading-none flex items-center"></span>
                <span className="h-[10px] leading-none flex items-center">F</span>
                <span className="h-[10px] leading-none flex items-center"></span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex gap-[3px] text-[9px] font-mono text-gray-400 h-3 relative select-none">
                  {weekMonths.map((month, idx) => (
                    <div key={idx} className="w-[10px] shrink-0 relative">
                      {month && <span className="absolute left-0 top-0 text-[9px] text-gray-400 whitespace-nowrap select-none">{month}</span>}
                    </div>
                  ))}
                </div>

                <div className="flex gap-[3px]">
                  {Array.from({ length: 53 }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px] shrink-0">
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const dataIndex = weekIdx * 7 + dayIdx;
                        const dayData = calendarData[dataIndex];
                        if (!dayData) return <div key={dayIdx} className="w-[10px] h-[10px] rounded-[2.5px] bg-transparent shrink-0" />;

                        const colorClass =
                          dayData.level === 0 ? 'bg-[#ebedf0] dark:bg-[#161b22] border border-gray-200/10 dark:border-neutral-800/50' :
                          dayData.level === 1 ? 'bg-amber-200 dark:bg-amber-950' :
                          dayData.level === 2 ? 'bg-amber-400 dark:bg-amber-800' :
                          dayData.level === 3 ? 'bg-amber-500 dark:bg-amber-600' :
                          'bg-amber-600 dark:bg-amber-400';

                        return (
                          <div
                            key={dayIdx}
                            onMouseEnter={(e) => handleMouseEnter(e, dayData)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-[10px] h-[10px] rounded-[2.5px] transition-all duration-100 shrink-0 hover:scale-120 cursor-pointer ${colorClass}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {hoveredDay && (
                <div
                  className="absolute z-30 bg-gray-900 text-white text-[9px] font-mono py-1 px-2 rounded-md shadow-md pointer-events-none whitespace-nowrap -translate-x-1/2 -translate-y-[130%] transition-all duration-75"
                  style={{ left: `${hoveredDay.x}px`, top: `${hoveredDay.y}px` }}
                >
                  <span className="font-bold">{hoveredDay.count} submission{hoveredDay.count !== 1 ? 's' : ''}</span> on {hoveredDay.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}