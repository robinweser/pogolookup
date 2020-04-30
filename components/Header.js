import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import Link from 'next/link'

import Layout from './Layout'

export default function Header() {
  const { theme } = useFela()

  return (
    <Box
      justifyContent="center"
      extend={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        height: 42,
        zIndex: 1,
        backgroundColor: theme.colors.text,
      }}>
      <Layout>
        <Link href="/">
          <a
            style={{ fontWeight: 700, color: 'white', textDecoration: 'none' }}>
            PoGo Lookup
          </a>
        </Link>
      </Layout>
    </Box>
  )
}
