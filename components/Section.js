import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from './Layout'

export default function Section({ children, title }) {
  const [expanded, setExpanded] = useState(true)
  const { theme } = useFela()

  return (
    <Box space={2}>
      {!title ? null : (
        <Layout>
          <Box
            id={title.toLowerCase().replace(' ', '-')}
            as="h2"
            onClick={() => setExpanded(!expanded)}
            extend={{
              borderBottomWidth: title ? 1 : 0,
              borderBottomStyle: 'solid',
              borderBottomColor: theme.colors.border,
              cursor: 'pointer',
              flexDirection: 'row',
            }}>
            <span
              style={{ color: 'rgb(100, 100, 100)', width: 20, marginTop: -2 }}>
              {expanded ? '-' : '+'}
            </span>{' '}
            {title}
          </Box>
        </Layout>
      )}
      {expanded ? children : null}
    </Box>
  )
}
