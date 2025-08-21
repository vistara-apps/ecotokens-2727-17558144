
'use client'

const leaderboardData = [
  {
    id: '1',
    username: 'EcoWarrior',
    carbonSaved: 45.2,
    tokensEarned: 890,
    rank: 1,
    avatar: '🌟'
  },
  {
    id: '2',
    username: 'GreenThumb',
    carbonSaved: 38.7,
    tokensEarned: 756,
    rank: 2,
    avatar: '🌱'
  },
  {
    id: '3',
    username: 'ClimateHero',
    carbonSaved: 32.1,
    tokensEarned: 645,
    rank: 3,
    avatar: '🌍'
  },
  {
    id: '4',
    username: 'You',
    carbonSaved: 28.3,
    tokensEarned: 540,
    rank: 4,
    avatar: '👤',
    isCurrentUser: true
  },
  {
    id: '5',
    username: 'EcoFriend',
    carbonSaved: 25.9,
    tokensEarned: 489,
    rank: 5,
    avatar: '♻️'
  }
]

export function LeaderBoard() {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400'
      case 2: return 'text-gray-300'
      case 3: return 'text-orange-400'
      default: return 'text-muted'
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  return (
    <div className="space-y-lg">
      {/* Weekly Challenge */}
      <div className="card-eco space-y-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text">Weekly Challenge</h3>
          <div className="token-badge">3 days left</div>
        </div>
        <div className="text-sm text-muted">
          Reduce carbon footprint by 5kg this week
        </div>
        <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
            style={{ width: '68%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted">
          <span>3.4kg reduced</span>
          <span>5.0kg goal</span>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 gap-sm">
        <div className="stat-card">
          <div className="text-lg font-bold text-accent">2,847</div>
          <div className="text-xs text-muted">Active Users</div>
        </div>
        <div className="stat-card">
          <div className="text-lg font-bold text-primary">15.2k</div>
          <div className="text-xs text-muted">kg CO₂ Saved</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card space-y-sm">
        <h4 className="font-medium text-text">Top Carbon Savers</h4>
        <div className="space-y-xs">
          {leaderboardData.map((user) => (
            <div 
              key={user.id} 
              className={`activity-item ${
                user.isCurrentUser 
                  ? 'bg-accent/10 border border-accent/20' 
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-sm">
                <div className={`text-lg font-bold w-8 text-center ${getRankColor(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>
                <div className="text-lg">{user.avatar}</div>
                <div className="text-left">
                  <div className={`text-sm font-medium ${
                    user.isCurrentUser ? 'text-accent' : 'text-text'
                  }`}>
                    {user.username}
                    {user.isCurrentUser && (
                      <span className="ml-xs text-xs bg-accent/20 text-accent px-xs py-xs rounded-sm">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted">
                    {user.carbonSaved}kg CO₂ saved
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-accent">
                  {user.tokensEarned}
                </div>
                <div className="text-xs text-muted">tokens</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Leaderboard */}
      <div className="card space-y-sm">
        <h4 className="font-medium text-text">Regional Impact</h4>
        <div className="space-y-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-sm">
              <span className="text-lg">🌎</span>
              <div>
                <div className="text-sm font-medium text-text">North America</div>
                <div className="text-xs text-muted">245 users active</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-primary">3.2k kg</div>
              <div className="text-xs text-muted">CO₂ saved</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-sm">
              <span className="text-lg">🌍</span>
              <div>
                <div className="text-sm font-medium text-text">Europe</div>
                <div className="text-xs text-muted">189 users active</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-primary">2.8k kg</div>
              <div className="text-xs text-muted">CO₂ saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
