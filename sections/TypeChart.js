import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import TypeTile from '../components/TypeTile'

import formatPercent from '../utils/formatPercent'

export default function TypeChart({ typeMultipliers }) {
  return (
    <Box>
      <Layout noPadding>
        <Box>
          <Box space={4} direction="row">
            <Box space={2} grow={1} shrink={0} basis={0}>
              <h3>Resistant</h3>
              <Box space={1}>
                {Object.keys(typeMultipliers)
                  .filter((m) => typeMultipliers[m] < 1)
                  .sort((a, b) =>
                    typeMultipliers[a] >= typeMultipliers[b] ? -1 : 1
                  )
                  .map((m) => (
                    <TypeTile type={m}>
                      {formatPercent(typeMultipliers[m], 0)}
                    </TypeTile>
                  ))}
              </Box>
            </Box>
            <Box space={2} grow={1} shrink={0} basis={0}>
              <h3>Vulnerable</h3>
              <Box space={1}>
                {Object.keys(typeMultipliers)
                  .filter((m) => typeMultipliers[m] > 1)
                  .sort((a, b) =>
                    typeMultipliers[a] >= typeMultipliers[b] ? -1 : 1
                  )
                  .map((m) => (
                    <TypeTile type={m}>
                      {formatPercent(typeMultipliers[m], 0)}
                    </TypeTile>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </Box>
  )
}
