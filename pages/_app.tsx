import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { DAppProvider, ChainId } from '@usedapp/core'

export default function App({ Component, pageProps }: AppProps) {
  const config = {
    readOnlyChainId: ChainId.Mainnet,
  }

  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  )
}
