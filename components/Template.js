import { Box } from 'kilvin'

import Header from './Header'
import Footer from './Footer'

export default function Template({ children }) {
  return (
    <Box>
      <Header />
      <Box paddingTop="42px" minHeight="100vh">
        {children}
      </Box>
      <Box paddingTop={10}>
        <Footer />
      </Box>
    </Box>
  )
}
