import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import NextLink from 'next/link'

import Layout from '../components/Layout'
import Template from '../components/Template'
import Section from '../components/Section'

const Link = ({ href, children }) => {
  const { theme } = useFela()

  return (
    <NextLink href={href} passHref>
      <Box as="a" extend={{ color: theme.colors.text }}>
        {children}
      </Box>
    </NextLink>
  )
}

export default function Page() {
  return (
    <Template>
      <Box paddingTop={5} paddingBottom={5} space={10}>
        <Section title="Lists">
          <Layout>
            <Box space={5}>
              <Link href="/lists/pokemon">Pokemon</Link>
            </Box>
          </Layout>
        </Section>
        <Section title="Calculators">
          <Layout>
            <Box space={5}>
              <Link href="/calculators/excitedbuddy">Excited Buddy</Link>
            </Box>
          </Layout>
        </Section>
      </Box>
    </Template>
  )
}
