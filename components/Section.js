import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from './Layout'

export default function Section({ children, title }) {
  const { theme } = useFela()

  return (
    <Box space={2}>
      <Layout>
        <Box
          as="h2"
          extend={{
            borderBottomWidth: title ? 1 : 0,
            borderBottomStyle: 'solid',
            borderBottomColor: theme.colors.border,
          }}>
          {title}
        </Box>
      </Layout>
      {children}
    </Box>
  )
}
