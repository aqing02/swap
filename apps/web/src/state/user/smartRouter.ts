import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const userUseStableSwapAtom = atomWithStorage<boolean>('pcs:useStableSwap', false)

export function useStableSwapByDefault() {
  return useAtom(userUseStableSwapAtom)
}
