'use client'

import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet'

interface TokenRewardsProps {
  tokensEarned: number
  onClaim: () => void
}

export function TokenRewards({ tokensEarned, onClaim }: TokenRewardsProps) {
  return (
    <div className="card bg-accent/10 border-accent/30">
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h3 className="text-lg font-semibold text-accent">Green Tokens Earned</h3>
          <p className="text-sm text-muted">Rewards for your sustainable actions</p>
        </div>
        <div className="text-3xl">🪙</div>
      </div>
      
      <div className="text-center mb-lg">
        <div className="text-4xl font-bold text-accent mb-sm">{tokensEarned}</div>
        <div className="text-sm text-muted">Tokens Available</div>
      </div>
      
      <div className="space-y-md">
        <Wallet className="w-full">
          <ConnectWallet>
            <div className="btn-primary w-full">Connect Wallet to Claim</div>
          </ConnectWallet>
          <WalletDropdown>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
        
        <button
          onClick={onClaim}
          className="btn-secondary w-full"
        >
          View Rewards Store
        </button>
      </div>
    </div>
  )
}
