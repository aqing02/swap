
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { SWRConfiguration } from 'swr'

import { checkIsStableSwap, MultiChainName } from './constant'

const refreshIntervalForInfo = 15000 // 15s
const SWR_SETTINGS_WITHOUT_REFETCH = {
  errorRetryCount: 3,
  errorRetryInterval: 3000,
}
const SWR_SETTINGS: SWRConfiguration = {
  refreshInterval: refreshIntervalForInfo,
  ...SWR_SETTINGS_WITHOUT_REFETCH,
}






export const useGetChainName = () => {
  const path = window.location.href

  const getChain = useCallback(() => {
    if (path.includes('eth')) return 'ETH'
    return 'BSC'
  }, [path])
  const [name, setName] = useState<MultiChainName | null>(getChain())
  const result = useMemo(() => name, [name])

  useEffect(() => {
    setName(getChain())
  }, [getChain])

  return result
}



export const useMultiChainPath = () => {
  const router = useRouter()
  const { chainName } = router.query
  return chainName ? `/${chainName}` : ''
}

export const useStableSwapPath = () => {
  return checkIsStableSwap() ? '?type=stableSwap' : ''
}
