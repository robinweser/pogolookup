import React from 'react'
import { Box } from 'kilvin'

export default function Layout({ children }) {
  return (
    <Box
      margin="0 auto"
      maxWidth={800}
      width="100%"
      justifyContent="center"
      alignItems="center"
      paddingLeft={[3, , 0]}
      paddingRight={[3, , 0]}>
      <Box width="100%">{children}</Box>
    </Box>
  )
}
