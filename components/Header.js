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
        height: 56,
        zIndex: 1,
        backgroundColor: theme.colors.text,
      }}>
      <Layout>
        <Box
          space={2.5}
          direction="row"
          alignItems="center"
          extend={{ overflow: 'auto' }}>
          <Link href="/">
            <a style={{ textDecoration: 'none' }}>
              <img
                src="/wordmark.png"
                height={18}
                width={130}
                style={{
                  marginTop: 4,
                  marginLeft: 3,
                  paddingRight: 14,
                }}
              />
            </a>
          </Link>
          <Link href="/">
            <a
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: 'white',
                textDecoration: 'none',
              }}>
              Pokemon
            </a>
          </Link>
          <Link href="/lists">
            <a
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: 'white',
                textDecoration: 'none',
              }}>
              Lists
            </a>
          </Link>
          <Link href="/calculators">
            <a
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: 'white',
                textDecoration: 'none',
              }}>
              Calculators
            </a>
          </Link>
        </Box>
      </Layout>
    </Box>
  )
}
