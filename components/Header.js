import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import Link from 'next/link'

import Layout from './Layout'
import { useTranslation } from '../utils/TranslationProvider'

export default function Header() {
  const { theme } = useFela()
  const { language, setLanguage } = useTranslation()

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
        <Box direction="row">
          <Box
            space={2.5}
            direction="row"
            alignItems="center"
            extend={{ overflow: 'auto' }}>
            <Link href="/">
              <a style={{ textDecoration: 'none' }}>
                <img
                  src="/wordmark.png"
                  height={16}
                  style={{
                    marginTop: 4,
                    marginLeft: 3,
                    paddingRight: 14,
                    width: 117,
                  }}
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
            <Link href="/lists">
              <a
                style={{
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
                  fontWeight: 500,
                  color: 'white',
                  textDecoration: 'none',
                }}>
                Calculators
              </a>
            </Link>
          </Box>
          <Box
            flex={1}
            alignItems="flex-end"
            justifyContent="center"
            onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
            extend={{ color: 'white', fontWeight: 500, cursor: 'pointer' }}>
            {language}
          </Box>
        </Box>
      </Layout>
    </Box>
  )
}
