import React from 'react';
import { motion } from 'motion/react';
import { Star, Trophy, Award } from 'lucide-react';

export default function DSALedger() {
  const stats = {
    totalSolved: 650,
    contestRating: 1633,
    globalRank: "Top 16.19%",
    username: "gurusangwani06",
    profileUrl: "https://leetcode.com/u/gurusangwani06"
  };

  const difficulties = [
    {
      label: "Easy",
      count: 211,
      total: 951,
      color: "text-emerald-500",
      bg: "bg-emerald-500",
      darkBg: "bg-emerald-950/20",
      borderColor: "border-emerald-500/20",
      accent: "text-emerald-600 dark:text-emerald-400"
    },
    {
      label: "Medium",
      count: 329,
      total: 2077,
      color: "text-amber-500",
      bg: "bg-amber-500",
      darkBg: "bg-amber-950/20",
      borderColor: "border-amber-500/20",
      accent: "text-amber-600 dark:text-amber-400"
    },
    {
      label: "Hard",
      count: 94,
      total: 949,
      color: "text-rose-500",
      bg: "bg-rose-500",
      darkBg: "bg-rose-950/20",
      borderColor: "border-rose-500/20",
      accent: "text-rose-600 dark:text-rose-400"
    }
  ];

  return (
    <div className="flex flex-col gap-4 mt-6" id="dsa-ledger-container">
      {/* Visual Section Header */}
      <div className="flex items-center justify-between" id="dsa-header">
        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-extrabold text-gray-900 dark:text-white tracking-wider uppercase">Problem Solving</span>
          <div className="h-px w-16 bg-warm-border/60" />
        </div>
        <span className="font-sans text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">LeetCode Stats</span>
      </div>

      {/* Main Stats Card */}
      <div className="p-6 bg-warm-card border border-warm-border rounded-3xl shadow-xs flex flex-col gap-5 transition-all duration-300" id="dsa-card">
        
        {/* Core Competitive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="competitive-stats-grid">
          {/* Total Solved Card */}
          <div className="p-4 bg-white dark:bg-[#0c0c0c]/40 border border-warm-border dark:border-neutral-800/80 rounded-2xl flex items-center justify-between" id="total-solved-card">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Total Solved</span>
              <span className="text-xl font-black text-gray-950 dark:text-white tracking-tight">
                {stats.totalSolved}+
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-3xs">
              <Trophy className="w-5 h-5" />
            </div>
          </div>

          {/* Contest Rating Card */}
          <div className="p-4 bg-white dark:bg-[#0c0c0c]/40 border border-warm-border dark:border-neutral-800/80 rounded-2xl flex items-center justify-between" id="contest-rating-card">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1">
                Contest Rating
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              </span>
              <span className="text-xl font-black text-gray-950 dark:text-white tracking-tight">
                {stats.contestRating} <span className="text-xs font-bold text-purple-600 dark:text-purple-400 font-sans"></span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-3xs">
              <Award className="w-5 h-5" />
            </div>
          </div>

          {/* Global Rank Card */}
          <div className="p-4 bg-white dark:bg-[#0c0c0c]/40 border border-warm-border dark:border-neutral-800/80 rounded-2xl flex items-center justify-between" id="global-rank-card">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Global Percentile</span>
              <span className="text-xl font-black text-gray-950 dark:text-white tracking-tight">
                {stats.globalRank}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-3xs">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Separated Difficulty Tracks */}
        <div className="flex flex-col gap-3" id="difficulty-breakdown-section">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Solved Problems Breakdown</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" id="difficulty-cards-container">
            {difficulties.map((diff) => {
              const percent = Math.round((diff.count / diff.total) * 100);
              return (
                <div 
                  key={diff.label} 
                  className={`p-4 bg-white dark:bg-[#0c0c0c]/20 border border-warm-border rounded-2xl flex flex-col gap-2.5 hover:shadow-2xs transition-all duration-300`}
                  id={`diff-card-${diff.label.toLowerCase()}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gray-900 dark:text-white">{diff.label}</span>
                    <span className={`text-xs font-mono font-bold ${diff.accent}`}>
                      {diff.count} <span className="text-gray-300 font-medium">/</span> {diff.total}
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${diff.bg}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1 }}
                    />
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

      </div>
    </div>
  );
}
