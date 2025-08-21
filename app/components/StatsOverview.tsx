'use client'

import { useState, useEffect } from 'react'

interface Stats {
  totalTokens: number
  carbonSaved: number
  activitiesLogged: number
  weeklyGoal: number
}

export function StatsOverview() {
  const [stats, setStats] = useState<Stats>({
    totalTokens: 0,
    carbonSaved: 0,
    activitiesLogged: 0,
    weeklyGoal: 7
  })

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('carbonTrackerStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const progressPercentage = Math.min((stats.activitiesLogged / stats.weeklyGoal) * 100, 100)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg">
      {/* Green Tokens */}
      <div className="stat-card">
        <div className="text-2xl mb-sm">🪙</div>
        <div className="text-2xl font-bold text-accent">{stats.totalTokens}</div>
        <div className="text-sm text-muted">Green Tokens</div>
      </div>

      {/* Carbon Saved */}
      <div className="stat-card">
        <div className="text-2xl mb-sm">🌱</div>
        <div className="text-2xl font-bold text-success">{stats.carbonSaved}kg</div>
        <div className="text-sm text-muted">CO₂ Saved</div>
      </div>

      {/* Activities */}
      <div className="stat-card">
        <div className="text-2xl mb-sm">📊</div>
        <div className="text-2xl font-bold text-text">{stats.activitiesLogged}</div>
        <div className="text-sm text-muted">Activities</div>
      </div>

      {/* Weekly Progress */}
      <div className="stat-card">
        <div className="text-2xl mb-sm">🎯</div>
        <div className="text-2xl font-bold text-warning">{Math.round(progressPercentage)}%</div>
        <div className="text-sm text-muted">Weekly Goal</div>
        <div className="w-full bg-surface rounded-full h-2 mt-sm">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
