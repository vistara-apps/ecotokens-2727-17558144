'use client'

import { useState, useEffect } from 'react'

interface HistoryActivity {
  id: string
  type: string
  description: string
  carbonSaved: number
  tokensEarned: number
  icon: string
  timestamp: string
}

export function ActivityHistory() {
  const [activities, setActivities] = useState<HistoryActivity[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const savedHistory = localStorage.getItem('carbonTrackerHistory')
    if (savedHistory) {
      setActivities(JSON.parse(savedHistory))
    }
  }, [])

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type.toLowerCase() === filter
  )

  const totalCarbonSaved = activities.reduce((sum, activity) => sum + activity.carbonSaved, 0)
  const totalTokensEarned = activities.reduce((sum, activity) => sum + activity.tokensEarned, 0)

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const activityTypes = ['all', 'transportation', 'waste', 'energy', 'food']

  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-md">
        <h2 className="text-xl font-bold">Activity History</h2>
        <div className="text-2xl">📋</div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-lg">
        <div className="card text-center">
          <div className="text-2xl mb-sm">🌱</div>
          <div className="text-xl font-bold text-success">{totalCarbonSaved.toFixed(1)}kg</div>
          <div className="text-sm text-muted">Total CO₂ Saved</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl mb-sm">🪙</div>
          <div className="text-xl font-bold text-accent">{totalTokensEarned}</div>
          <div className="text-sm text-muted">Total Tokens Earned</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-sm overflow-x-auto">
        {activityTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-md py-sm rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              filter === type
                ? 'bg-accent text-white'
                : 'bg-surface text-muted hover:text-text hover:bg-surface/80'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-md">
        {filteredActivities.length === 0 ? (
          <div className="card text-center">
            <div className="text-4xl mb-md">🌱</div>
            <h3 className="text-lg font-semibold mb-sm">No activities yet</h3>
            <p className="text-muted">Start logging your green activities to see them here!</p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="flex items-center gap-md">
                <div className="text-2xl">{activity.icon}</div>
                <div>
                  <h3 className="font-medium text-text">{activity.description}</h3>
                  <p className="text-sm text-muted">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-success">-{activity.carbonSaved}kg CO₂</div>
                <div className="text-sm text-accent">+{activity.tokensEarned} tokens</div>
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="card bg-accent/10 border-accent/30">
          <div className="flex items-start gap-md">
            <div className="text-2xl">🎉</div>
            <div>
              <h3 className="font-semibold text-accent mb-sm">Great Progress!</h3>
              <p className="text-sm text-muted">
                You've logged {activities.length} green activities and saved {totalCarbonSaved.toFixed(1)}kg of CO₂. 
                Keep up the amazing work for our planet!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
