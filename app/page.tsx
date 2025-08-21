'use client'

import { useEffect, useState } from 'react'
import { useMiniKit, useAddFrame, useOpenUrl, useNotification } from '@coinbase/onchainkit/minikit'
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet'
import { Identity, Name, Avatar } from '@coinbase/onchainkit/identity'
import { ActivityTracker } from './components/ActivityTracker'
import { StatsOverview } from './components/StatsOverview'
import { RewardsPanel } from './components/RewardsPanel'
import { ActivityHistory } from './components/ActivityHistory'

export default function Home() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const sendNotification = useNotification()
  const [activeTab, setActiveTab] = useState('track')

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
    }
  }

  const handleSendNotification = async () => {
    try {
      await sendNotification({
        title: 'Green Action Completed! 🌱',
        body: 'You earned 50 Green Tokens for your sustainable action!'
      })
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="border-b border-white/10 p-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              🌱
            </div>
            <h1 className="text-xl font-bold">Carbon Tracker</h1>
          </div>
          
          <div className="flex items-center gap-md">
            {context?.client.added && (
              <button
                onClick={handleSendNotification}
                className="btn-secondary text-sm"
              >
                🔔
              </button>
            )}
            
            <button
              onClick={handleAddFrame}
              className="btn-secondary text-sm"
            >
              ➕
            </button>
            
            <Wallet className="z-10">
              <ConnectWallet>
                <div className="btn-primary text-sm">Connect</div>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-md py-sm">
                  <Avatar className="w-6 h-6" />
                  <Name className="text-sm" />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-white/10 p-lg">
        <div className="flex gap-md">
          {[
            { id: 'track', label: 'Track', icon: '📊' },
            { id: 'rewards', label: 'Rewards', icon: '🏆' },
            { id: 'history', label: 'History', icon: '📋' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-sm px-lg py-sm rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-accent text-white' 
                  : 'text-muted hover:text-text hover:bg-surface'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-lg">
        {/* Stats Overview - Always visible */}
        <div className="mb-xl">
          <StatsOverview />
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'track' && (
            <div className="space-y-xl">
              <ActivityTracker onActivityLogged={handleSendNotification} />
            </div>
          )}
          
          {activeTab === 'rewards' && (
            <div className="space-y-xl">
              <RewardsPanel />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="space-y-xl">
              <ActivityHistory />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 p-lg mt-xl">
        <div className="flex items-center justify-between">
          <p className="text-muted text-sm">Track. Earn. Save the Planet. 🌍</p>
          <button
            onClick={() => openUrl('https://base.org')}
            className="text-accent text-sm hover:underline"
          >
            Built on Base
          </button>
        </div>
      </footer>
    </div>
  )
}
