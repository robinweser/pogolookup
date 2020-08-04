import React, { useState, useEffect } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from './Layout'

let expandedMap = {}

export default function Section({ children, title }) {
  if (!expandedMap.hasOwnProperty(title)) {
    expandedMap[title] = true
  }

  const { theme } = useFela()
  const [expanded, setExpanded] = useState(expandedMap[title])

  useEffect(() => {
    expandedMap[title] = expanded
  }, [expanded])

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
