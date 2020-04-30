import React from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import TypeTile from '../components/TypeTile'
import padLeft from '../utils/padLeft'

const getImageURL = (id) =>
  `https://images.gameinfo.io/pokemon/256/${padLeft(
    id.toString(),
    3,
    '0'
  )}-00.png`

export default function Evolutions({ evolutions, level, setName }) {
  const { theme } = useFela()

  return (
    <Box>
      <Layout>
        <Box direction="row" wrap="wrap">
          {evolutions.map((evolution) => {
            const info = evolution.getInfo()
            const stats = evolution.getStats(level)

            return (
              <Box
                padding={3}
                paddingTop={2}
                justifyContent="center"
                alignItems="center"
                marginBottom={2}
                marginRight={2}
                minWidth={['calc(50% - 4px)', , 160]}
                extend={{
                  cursor: 'pointer',
                  boxShadow: '0 0 3px rgba(0,0,0,0.4)',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  ':nth-child(2n)': {
                    marginRight: 0,
                  },
                  large: {
                    marginRight: 8,
                  },
                }}
                onClick={() => setName(info.name)}>
                <img src={getImageURL(info.id)} height={80} width="auto" />
                <p style={{ fontSize: 20, fontWeight: 700 }}>{info.name}</p>
                <Box direction="row" space={1} alignItems="center">
                  <TypeTile type={info.type1} />
                  {info.type2 ? <TypeTile type={info.type2} /> : null}
                </Box>
                <Spacer size={1} />
                <p style={{ fontSize: 20 }}>{stats.cp} CP</p>
              </Box>
            )
          })}
        </Box>
      </Layout>
    </Box>
  )
}
