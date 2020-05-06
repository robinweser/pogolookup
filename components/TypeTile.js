import React from 'react'
import { useFela } from 'react-fela'
import { Box } from 'kilvin'

export default function TypeTile({ type, children }) {
  const { theme } = useFela()

  return (
    <Box
      direction="row"
      alignItems="center"
      space={2}
      extend={{
        backgroundColor: theme.colors.types[type].backgroundColor + '33',
        borderRadius: 8,
      }}>
      <Box
        alignSelf="flex-start"
        grow={children ? 0 : 1}
        minWidth={children ? 70 : undefined}
        extend={{
          textAlign: 'center',
          ...theme.colors.types[type],
          padding: '4px 6px',
          borderRadius: children ? '8px 0 0 8px' : 8,
        }}>
        {type}
      </Box>
      {children ? <Box>{children}</Box> : null}
    </Box>
  )
}
