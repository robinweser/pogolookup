import { ThemeProvider } from 'react-fela'

import FelaProvider from '../styling/FelaProvider'
import theme from '../styling/theme'
import { TranslationProvider } from '../utils/TranslationProvider'

export default function App({ Component, pageProps, renderer }) {
  return (
    <FelaProvider renderer={renderer}>
      <ThemeProvider theme={theme}>
        <TranslationProvider>
          <Component {...pageProps} />
        </TranslationProvider>
      </ThemeProvider>
    </FelaProvider>
  )
}
