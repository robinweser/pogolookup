import React from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import TypeTile from '../components/TypeTile'

import getImageUrl from '../utils/getImageUrl'

function EvolutionTile({ pokemon, level, setName }) {
  const info = pokemon.getInfo()
  const stats = pokemon.getStats(level)

  return (
    <Box
      padding={3}
      paddingTop={2}
      justifyContent="center"
      alignItems="center"
      alignSelf="flex-start"
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
          ':nth-child(2n)': {
            marginRight: 8,
          },
        },
      }}
      onClick={() => setName(info.name)}>
      <img src={getImageUrl(info.assetId)} height={80} width="auto" />
      <p style={{ fontSize: 20, fontWeight: 700 }}>{info.name}</p>
      <Box direction="row" space={1} alignItems="center">
        <TypeTile type={info.type1} />
        {info.type2 ? <TypeTile type={info.type2} /> : null}
      </Box>
      <Spacer size={1} />
      <p style={{ fontSize: 20 }}>{stats.cp} CP</p>
    </Box>
  )
}

function SplitLine() {
  return (
    <Box
      marginLeft={[0, , 1]}
      marginRight={[0, , 3]}
      marginBottom={2}
      width={['100%', , 2]}
      height={[2, , 'auto']}
      extend={{ backgroundColor: 'rgb(200, 200, 200)' }}
    />
  )
}

export default function Evolutions({
  pokemon,
  level,
  evolutions,
  preEvolutions,
  setName,
}) {
  const { theme } = useFela()

  return (
    <Box>
      <Layout>
        <Box direction={['column', , 'row']}>
          <Box direction="row" wrap="wrap" grow={0} shrink={1}>
            {preEvolutions.map((pokemon) => (
              <EvolutionTile
                pokemon={pokemon}
                level={level}
                setName={setName}
              />
            ))}
          </Box>
          {preEvolutions.length === 0 ? null : <SplitLine />}
          <EvolutionTile pokemon={pokemon} level={level} setName={() => {}} />
          {evolutions.length === 0 ? null : <SplitLine />}
          <Box direction="row" wrap="wrap" grow={0} shrink={1}>
            {evolutions.map((pokemon) => (
              <EvolutionTile
                pokemon={pokemon}
                level={level}
                setName={setName}
              />
            ))}
          </Box>
        </Box>
      </Layout>
    </Box>
  )
}
