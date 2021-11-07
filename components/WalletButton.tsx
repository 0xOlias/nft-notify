import { useState, useRef, useMemo } from 'react'
import useOnClickOutside from 'use-onclickoutside'

import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  WalletConnectConnector,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from '@web3-react/walletconnect-connector'

import Info from '../components/icons/Info'

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.RPC_URL_1!,
}

enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

export default function WalletButton() {
  const { activate, deactivate, account, error, setError } = useWeb3React()

  const [showingModal, setShowingModal] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setShowingModal(false))

  const [showingInfo, setShowingInfo] = useState(false)

  const handleActivateWallet = (connectorId: ConnectorNames) => () => {
    let connector: AbstractConnector

    switch (connectorId) {
      case ConnectorNames.Injected: {
        connector = new InjectedConnector({ supportedChainIds: [1] })
        break
      }
      case ConnectorNames.WalletConnect: {
        connector = new WalletConnectConnector({
          supportedChainIds: [1],
          rpc: { 1: RPC_URLS[1] },
          qrcodeModalOptions: {
            mobileLinks: ['rainbow', 'metamask', 'argent', 'trust'],
            // desktopLinks: ['metamask', 'argent', 'trust'],
          },
        })
        break
      }
      default: {
        setError(new Error(`Invalid connector: ${connectorId}`))
        return
      }
    }

    activate(connector)
    setShowingModal(false)
  }

  const handleDeactivateWallet = () => {
    deactivate()
  }

  const handleButtonClicked = () => {
    setShowingModal(!showingModal)
  }

  const info = useMemo(() => {
    if (account) {
      return { style: 'text-green-500', text: `You're connected! 🚀` }
    } else if (error) {
      return { style: 'text-red-500', text: getErrorMessage(error) }
    } else {
      return { style: 'text-yellow-500', text: 'Not connected' }
    }
  }, [account, error])

  return (
    <>
      <div className="flex flex-row gap-2">
        <button
          type="button"
          onClick={handleButtonClicked}
          className="px-2 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
        >
          {account ? <p>{account.slice(0, 6)}</p> : <p>Connect Wallet</p>}
        </button>

        <div
          onMouseEnter={() => setShowingInfo(true)}
          onMouseLeave={() => setShowingInfo(false)}
          className="px-2 py-2 bg-gray-300 hover:bg-gray-400 rounded-md relative"
        >
          <Info className={`${info.style}`} />
          {showingInfo && (
            <div className="absolute whitespace-nowrap top-12 right-0 bg-gray-300 px-2 py-2 rounded-md">
              <p>{info.text}</p>
            </div>
          )}
        </div>
      </div>

      {showingModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto
          h-full w-full flex justify-center items-center"
        >
          <div ref={ref} className="flex flex-col justify-center items-center rounded-3xl bg-white p-10">
            {!account && (
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleActivateWallet(ConnectorNames.Injected)}
                  className="flex justify-center items-center rounded-md bg-gray-300 hover:bg-gray-400 w-60 h-20"
                >
                  <img src="./assets/metamask.svg" width={240} />
                </button>
                <button
                  onClick={handleActivateWallet(ConnectorNames.WalletConnect)}
                  className="flex justify-center items-center rounded-md bg-gray-300 hover:bg-gray-400 w-60 h-20"
                >
                  <img src="./assets/walletconnect.svg" width={220} />
                </button>
              </div>
            )}
            {account && (
              <div className="flex flex-col gap-4">
                Address: {account.slice(0, 6)}
                <button
                  onClick={handleDeactivateWallet}
                  className="flex justify-center items-center rounded-md bg-gray-300 hover:bg-gray-400 w-60 h-20"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

import { UnsupportedChainIdError } from '@web3-react/core'

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}
