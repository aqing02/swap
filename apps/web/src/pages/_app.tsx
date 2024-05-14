import '@pancakeswap/ui/css/reset.css'
import { ResetCSS, ScrollToTopButtonV2, ToastListener } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import GlobalCheckClaimStatus from 'components/GlobalCheckClaimStatus'
import PublicFooter from 'components/PublicFooter'
// import { NetworkModal } from 'components/NetworkModal'
// import { NetworkModal } from 'components/NetworkModal'
// import { FixedSubgraphHealthIndicator } from 'components/SubgraphHealthIndicator/FixedSubgraphHealthIndicator'
// import TransactionsDetailModal from 'components/TransactionDetailModal'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
// import dynamic from 'next/dynamic'
import Head from 'next/head'
import React, { Fragment } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, useStore } from 'state'
import { Blocklist, Updaters } from '..'
import { SentryErrorBoundary } from '../components/ErrorBoundary'
import Menu from '../components/Menu'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'

// const EasterEgg = dynamic(() => import('components/EasterEgg'), { ssr: false })

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function MyApp(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps, Component } = props
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Cheaper and faster than Uniswap? Discover BomeSwap, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE."
        />
        <meta name="theme-color" content="#1FC7D4" />
        <meta name="twitter:image" content="https://BomeSwap.biz/images/turtfly.jpg" />
        <meta
          name="twitter:description"
          content="The most popular AMM on BSC! in BomeSwap."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🥞 BomeSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)" />
        <title>BomeSwap</title>
      </Head>
      <Providers store={store}>
        <Blocklist>
          <ResetCSS />
          <GlobalStyle />
          <GlobalCheckClaimStatus excludeLocations={[]} />
          <PersistGate loading={null} persistor={persistor}>
            <Updaters />
            <App {...props} />
          </PersistGate>
        </Blocklist>
      </Providers>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>
  /** render component without all layouts */
  pure?: true
  /** is mini program */
  mp?: boolean
  /**
   * allow chain per page, empty array bypass chain block modal
   * @default [ChainId.BSC]
   * */
  chains?: number[]
  isShowScrollToTopButton?: true
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const ProductionErrorBoundary = process.env.NODE_ENV === 'production' ? SentryErrorBoundary : Fragment

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.pure) {
    return <Component {...pageProps} />
  }

  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  const ShowMenu = Component.mp ? Fragment : Menu
  const isShowScrollToTopButton = Component.isShowScrollToTopButton || true

  return (
    <ProductionErrorBoundary>
      <ShowMenu>
        <Layout>
          <Component {...pageProps} />
          {/* <PublicFooter /> */}
        </Layout>
      </ShowMenu>
      {/* <EasterEgg iterations={2} />
      <ToastListener />
      <FixedSubgraphHealthIndicator />
      <NetworkModal pageSupportedChains={Component.chains} />
      <TransactionsDetailModal />
      {isShowScrollToTopButton && <ScrollToTopButtonV2 />} */}
    </ProductionErrorBoundary>
  )
}

export default MyApp
