import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Assaver',
  projectId: process.env.REACT_APP_PROJECT_ID ?? '',
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
    // [sepolia.id]: http(),
    // [hardhat.id]: http(),
  },
})
