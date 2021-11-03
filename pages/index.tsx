import type { NextPage } from 'next'
import Head from 'next/head'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFT Notify</title>
      </Head>
      <div className="relative w-screen min-h-screen p-4 md:p-8">
        <div>Nav!</div>

        <div className="flex flex-col md:flex-row md:items-center justify-center w-full gap-6 mb-16"></div>
      </div>
    </>
  )
}

export default HomePage
