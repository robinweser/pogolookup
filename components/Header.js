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
        <Box space={2.5} direction="row" alignItems="center">
          <Link href="/">
            <a style={{ textDecoration: 'none' }}>
              <img
                src="/wordmark.png"
                height={16}
                style={{ marginTop: 4, marginLeft: 3, paddingRight: 14 }}
              />
            </a>
          </Link>
          <Link href="/">
            <a
              style={{
                fontWeight: 500,
                color: 'white',
                textDecoration: 'none',
              }}>
              Pokemon
            </a>
          </Link>
          <Link href="/moves">
            <a
              style={{
                fontWeight: 500,
                color: 'white',
                textDecoration: 'none',
              }}>
              Moves
            </a>
          </Link>
          <Link href="/types">
            <a
              style={{
                fontWeight: 500,
                color: 'white',
                textDecoration: 'none',
              }}>
              Types
            </a>
          </Link>
        </Box>
      </Layout>
    </Box>
  )
}
