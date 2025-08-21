'use client'

import { useState, useEffect } from 'react'

interface Reward {
  id: string
  title: string
  description: string
  cost: number
  icon: string
  type: 'discount' | 'nft' | 'donation'
}

const AVAILABLE_REWARDS: Reward[] = [
  {
    id: 'coffee_discount',
    title: '10% Coffee Discount',
    description: 'Get 10% off at participating eco-friendly cafes',
    cost: 50,
    icon: '☕',
    type: 'discount'
  },
  {
    id: 'tree_nft',
    title: 'Digital Tree NFT',
    description: 'Mint a unique tree NFT to showcase your impact',
    cost: 100,
    icon: '🌳',
    type: 'nft'
  },
  {
    id: 'plant_tree',
    title: 'Plant a Real Tree',
    description: 'We will plant a tree in your name',
    cost: 200,
    icon: '🌱',
    type: 'donation'
  },
  {
    id: 'eco_badge',
    title: 'Eco Warrior Badge',
    description: 'Special NFT badge for environmental champions',
    cost: 150,
    icon: '🏆',
    type: 'nft'
  },
  {
    id: 'carbon_offset',
    title: 'Carbon Offset Credits',
    description: 'Purchase verified carbon offset credits',
    cost: 300,
    icon: '🌍',
    type: 'donation'
  },
  {
    id: 'bike_discount',
    title: '15% Bike Shop Discount',
    description: 'Discount at local bike shops and repair services',
    cost: 75,
    icon: '🚴',
    type: 'discount'
  }
]

export function RewardsPanel() {
  const [userTokens, setUserTokens] = useState(0)
  const [redeeming, setRedeeming] = useState<string | null>(null)

  useEffect(() => {
    const savedStats = localStorage.getItem('carbonTrackerStats')
    if (savedStats) {
      const stats = JSON.parse(savedStats)
      setUserTokens(stats.totalTokens || 0)
    }
  }, [])

  const handleRedeem = async (reward: Reward) => {
    if (userTokens < reward.cost) return
    
    setRedeeming(reward.id)
    
    // Simulate redemption process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update user tokens
    const newTokenBalance = userTokens - reward.cost
    setUserTokens(newTokenBalance)
    
    // Update localStorage
    const savedStats = localStorage.getItem('carbonTrackerStats')
    if (savedStats) {
      const stats = JSON.parse(savedStats)
      stats.totalTokens = newTokenBalance
      localStorage.setItem('carbonTrackerStats', JSON.stringify(stats))
    }
    
    setRedeeming(null)
    
    // Show success message (in a real app, you'd show a proper notification)
    alert(`Successfully redeemed: ${reward.title}!`)
  }

  return (
    <div className="space-y-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <h2 className="text-xl font-bold">Rewards Store</h2>
          <div className="text-2xl">🏆</div>
        </div>
        <div className="card">
          <div className="flex items-center gap-sm">
            <span className="text-2xl">🪙</span>
            <span className="text-lg font-bold text-accent">{userTokens}</span>
            <span className="text-sm text-muted">tokens</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {AVAILABLE_REWARDS.map((reward) => {
          const canAfford = userTokens >= reward.cost
          const isRedeeming = redeeming === reward.id
          
          return (
            <div
              key={reward.id}
              className={`card transition-all duration-200 ${
                canAfford ? 'hover:border-accent/50' : 'opacity-60'
              }`}
            >
              <div className="text-center mb-md">
                <div className="text-4xl mb-sm">{reward.icon}</div>
                <h3 className="font-semibold text-text mb-sm">{reward.title}</h3>
                <p className="text-sm text-muted mb-md">{reward.description}</p>
              </div>
              
              <div className="flex items-center justify-between mb-lg">
                <div className="flex items-center gap-sm">
                  <span className="text-lg font-bold text-accent">{reward.cost}</span>
                  <span className="text-sm text-muted">tokens</span>
                </div>
                <div className={`px-sm py-xs rounded text-xs ${
                  reward.type === 'discount' ? 'bg-warning/20 text-warning' :
                  reward.type === 'nft' ? 'bg-accent/20 text-accent' :
                  'bg-success/20 text-success'
                }`}>
                  {reward.type.toUpperCase()}
                </div>
              </div>
              
              <button
                onClick={() => handleRedeem(reward)}
                disabled={!canAfford || isRedeeming}
                className={`w-full py-sm px-lg rounded-md font-medium transition-all duration-200 ${
                  canAfford && !isRedeeming
                    ? 'btn-primary'
                    : 'bg-surface text-muted cursor-not-allowed'
                }`}
              >
                {isRedeeming ? 'Redeeming...' : canAfford ? 'Redeem' : 'Not enough tokens'}
              </button>
            </div>
          )
        })}
      </div>
      
      <div className="card bg-accent/10 border-accent/30">
        <div className="flex items-start gap-md">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-semibold text-accent mb-sm">Earn More Tokens</h3>
            <p className="text-sm text-muted">
              Log more green activities to earn tokens and unlock amazing rewards. 
              Every sustainable action counts towards a better planet!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
