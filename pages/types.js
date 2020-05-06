import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import Template from '../components/Template'
import TypeTile from '../components/TypeTile'

import TypeChart from '../sections/TypeChart'

import getTypeMultipliers from '../utils/getTypeMultipliers'

export default function Page() {
  const { theme } = useFela()
  const [selected, setSelected] = useState([])

  const typeMultipliers = getTypeMultipliers(selected)

  return (
    <Template>
      <Box paddingTop={3} space={5}>
        <Layout>
          <Box direction="row" wrap="wrap">
            {Object.keys(theme.colors.types).map((type) => (
              <Box
                onClick={() => {
                  if (selected.indexOf(type) !== -1) {
                    setSelected(selected.filter((s) => s !== type))
                  } else if (selected.length === 2) {
                    setSelected([type])
                  } else {
                    setSelected([...selected, type])
                  }
                }}
                extend={{
                  marginRight: 8,
                  opacity: selected.indexOf(type) !== -1 ? 1 : 0.33,
                  cursor: 'pointer',
                  width: 'calc(33.3333% - 6px)',
                  ':nth-child(3n)': {
                    marginRight: 0,
                  },
                  medium: {
                    width: 'calc(25% - 8px)',
                    ':nth-child(3n)': {
                      marginRight: 8,
                    },
                    ':nth-child(4n)': {
                      marginRight: 0,
                    },
                  },
                  large: {
                    width: 'calc(20% - 8px)',
                    ':nth-child(3n)': {
                      marginRight: 8,
                    },
                    ':nth-child(4n)': {
                      marginRight: 8,
                    },
                    ':nth-child(5n)': {
                      marginRight: 0,
                    },
                  },
                }}
                marginRight={2}
                marginBottom={2}>
                <TypeTile type={type} />
              </Box>
            ))}
          </Box>
        </Layout>
        {selected.length === 0 ? (
          <Layout>
            <Box>Please select at least one type.</Box>
          </Layout>
        ) : (
          <TypeChart typeMultipliers={typeMultipliers} />
        )}
      </Box>
    </Template>
  )
}
