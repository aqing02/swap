import {
  MenuItemsType,
  SwapIcon,
  SwapFillIcon,
  NftIcon,
  NftFillIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'


export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: []
    },
    {
      label: t("流动性"),
      icon: NftIcon,
      fillIcon: NftFillIcon,
      href: '/liquidity',
      showItemsOnMobile: false,
      items: []
    },
    {
      label: t("机器人"),
      icon: NftIcon,
      fillIcon: NftFillIcon,
      href: '/robot',
      showItemsOnMobile: false,
      items: []
    }
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
