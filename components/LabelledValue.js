import React from 'react'
import { Box } from 'kilvin'

export default function ValueDisplay({ name, children }) {
  return (
    <Box grow={1} shrink={0} basis={0} alignItems="flex-start">
      <Box alignItems="center">
        <p>{children}</p>
        <span style={{ fontSize: 10 }}>{name}</span>
      </Box>
    </Box>
  )
}
