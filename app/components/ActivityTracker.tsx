'use client'

import { useState } from 'react'

interface Activity {
  id: string
  type: string
  description: string
  carbonSaved: number
  tokensEarned: number
  icon: string
}

const ACTIVITY_TYPES: Activity[] = [
  {
    id: 'bike',
    type: 'Transportation',
    description: 'Biked instead of driving',
    carbonSaved: 2.5,
    tokensEarned: 25,
    icon: '🚴'
  },
  {
    id: 'public_transport',
    type: 'Transportation', 
    description: 'Used public transport',
    carbonSaved: 1.8,
    tokensEarned: 18,
    icon: '🚌'
  },
  {
    id: 'walk',
    type: 'Transportation',
    description: 'Walked instead of driving',
    carbonSaved: 3.0,
    tokensEarned: 30,
    icon: '🚶'
  },
  {
    id: 'recycle',
    type: 'Waste',
    description: 'Recycled materials',
    carbonSaved: 0.5,
    tokensEarned: 10,
    icon: '♻️'
  },
  {
    id: 'energy_save',
    type: 'Energy',
    description: 'Used energy-efficient appliances',
    carbonSaved: 1.2,
    tokensEarned: 15,
    icon: '💡'
  },
  {
    id: 'plant_based',
    type: 'Food',
    description: 'Ate plant-based meal',
    carbonSaved: 2.0,
    tokensEarned: 20,
    icon: '🥗'
  }
]

interface ActivityTrackerProps {
  onActivityLogged?: () => void
}

export function ActivityTracker({ onActivityLogged }: ActivityTrackerProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isLogging, setIsLogging] = useState(false)

  const handleLogActivity = async (activity: Activity) => {
    setIsLogging(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update stats in localStorage
    const savedStats = localStorage.getItem('carbonTrackerStats')
    const currentStats = savedStats ? JSON.parse(savedStats) : {
      totalTokens: 0,
      carbonSaved: 0,
      activitiesLogged: 0,
      weeklyGoal: 7
    }
    
    const updatedStats = {
      ...currentStats,
      totalTokens: currentStats.totalTokens + activity.tokensEarned,
      carbonSaved: currentStats.carbonSaved + activity.carbonSaved,
      activitiesLogged: currentStats.activitiesLogged + 1
    }
    
    localStorage.setItem('carbonTrackerStats', JSON.stringify(updatedStats))
    
    // Save activity to history
    const savedHistory = localStorage.getItem('carbonTrackerHistory')
    const currentHistory = savedHistory ? JSON.parse(savedHistory) : []
    const newActivity = {
      ...activity,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    }
    
    localStorage.setItem('carbonTrackerHistory', JSON.stringify([newActivity, ...currentHistory]))
    
    setIsLogging(false)
    setSelectedActivity(null)
    
    // Trigger notification
    if (onActivityLogged) {
      onActivityLogged()
    }
    
    // Reload page to update stats
    window.location.reload()
  }

  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-md">
        <h2 className="text-xl font-bold">Log Green Activity</h2>
        <div className="text-2xl">🌱</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {ACTIVITY_TYPES.map((activity) => (
          <div
            key={activity.id}
            className={`card cursor-pointer transition-all duration-200 hover:border-accent/50 ${
              selectedActivity?.id === activity.id ? 'border-accent bg-accent/10' : ''
            }`}
            onClick={() => setSelectedActivity(activity)}
          >
            <div className="flex items-start gap-md">
              <div className="text-3xl">{activity.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-text">{activity.description}</h3>
                <p className="text-sm text-muted mb-md">{activity.type}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-lg">
                    <span className="text-sm text-success">-{activity.carbonSaved}kg CO₂</span>
                    <span className="text-sm text-accent">+{activity.tokensEarned} tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedActivity && (
        <div className="card border-accent animate-slide-up">
          <div className="flex items-center justify-between mb-lg">
            <h3 className="text-lg font-semibold">Confirm Activity</h3>
            <button
              onClick={() => setSelectedActivity(null)}
              className="text-muted hover:text-text"
            >
              ✕
            </button>
          </div>
          
          <div className="flex items-center gap-md mb-lg">
            <div className="text-2xl">{selectedActivity.icon}</div>
            <div>
              <p className="font-medium">{selectedActivity.description}</p>
              <p className="text-sm text-muted">{selectedActivity.type}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-success">-{selectedActivity.carbonSaved}kg</div>
              <div className="text-sm text-muted">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">+{selectedActivity.tokensEarned}</div>
              <div className="text-sm text-muted">Green Tokens</div>
            </div>
          </div>
          
          <button
            onClick={() => handleLogActivity(selectedActivity)}
            disabled={isLogging}
            className="btn-primary w-full"
          >
            {isLogging ? 'Logging...' : 'Log Activity'}
          </button>
        </div>
      )}
    </div>
  )
}
