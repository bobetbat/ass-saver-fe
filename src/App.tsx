import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { config } from './wagmi';
import { Main } from './components/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient()

const App = () => {
  return <WagmiProvider config={config}>
    <QueryClientProvider client={client}>
      <RainbowKitProvider>
        <Main />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
}

export default App;
