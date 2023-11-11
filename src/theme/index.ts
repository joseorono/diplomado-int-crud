import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'system',   // System sets initial value.
  useSystemColorMode: true,     // App color mode is subscribed to system color mode changes.
}

const theme = extendTheme({ config })

export default theme