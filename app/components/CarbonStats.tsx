
'use client'

interface UserData {
  totalCarbon: number
  tokensEarned: number
  activitiesLogged: number
  weeklyReduction: number
}

interface CarbonStatsProps {
  userData: UserData
}

export function CarbonStats({ userData }: CarbonStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-sm">
      <div className="stat-card card-carbon">
        <div className="text-2xl font-bold text-carbon">
          {userData.totalCarbon.toFixed(1)}
        </div>
        <div className="text-xs text-muted mt-xs">kg CO₂ this month</div>
        <div className="carbon-badge mt-sm">
          -{userData.weeklyReduction.toFixed(1)}kg this week
        </div>
      </div>
      
      <div className="stat-card card-eco">
        <div className="text-2xl font-bold text-accent">
          {userData.tokensEarned}
        </div>
        <div className="text-xs text-muted mt-xs">Green Tokens</div>
        <div className="token-badge mt-sm">
          +{Math.floor(userData.weeklyReduction * 2)} this week
        </div>
      </div>
      
      <div className="stat-card">
        <div className="text-lg font-bold text-text">
          {userData.activitiesLogged}
        </div>
        <div className="text-xs text-muted mt-xs">Activities Logged</div>
      </div>
      
      <div className="stat-card">
        <div className="text-lg font-bold text-primary">
          Level {Math.floor(userData.tokensEarned / 100) + 1}
        </div>
        <div className="text-xs text-muted mt-xs">Eco Warrior</div>
      </div>
    </div>
  )
}
