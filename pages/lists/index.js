import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import NextLink from 'next/link'

import Layout from '../../components/Layout'
import Template from '../../components/Template'
import Link from '../../components/Link'

export default function Page() {
  return (
    <Template>
      <Box paddingTop={5} paddingBottom={5}>
        <Layout>
          <Box space={3}>
            <Link href="/lists/pokemon">Pokemon</Link>
            <Link href="/lists/moves">Moves</Link>
            <Link href="/lists/types">Types</Link>
          </Box>
        </Layout>
      </Box>
    </Template>
  )
}
