import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import Link from 'next/link'

import Layout from '../../components/Layout'
import Template from '../../components/Template'
import Section from '../../components/Section'
import TypeTile from '../../components/TypeTile'

import pokedex from '../../data/pokedex.json'
import createPokemon from '../../utils/createPokemon'
import getImageUrl from '../../utils/getImageUrl'

const icon =
  'PHN2ZyBoZWlnaHQ9IjEwMDBweCIgd2lkdGg9Ijg2NnB4IiB2aWV3Qm94PSIwIDAgODY2IDEwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGc+CiAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjcwIiBzdHJva2U9IiNiZWJlYmUiIGZpbGw9IiNiZWJlYmUiIGQ9Ik02MyAyODBjMCAwIDM3MCAzNTYgMzcwIDM1NmMwIDAgMzcyIC0zNTYgMzcyIC0zNTZjMTQuNjY3IC0xNy4zMzMgMzAuNjY3IC0xNy4zMzMgNDggMGMxNy4zMzMgMTQuNjY3IDE3LjMzMyAzMC42NjcgMCA0OGMwIDAgLTM5NiAzOTIgLTM5NiAzOTJjLTE0LjY2NyAxNC42NjcgLTMwLjY2NyAxNC42NjcgLTQ4IDBjMCAwIC0zOTYgLTM5MiAtMzk2IC0zOTJjLTE3LjMzMyAtMTcuMzMzIC0xNy4zMzMgLTMzLjMzMyAwIC00OGMxNiAtMTYgMzIuNjY3IC0xNiA1MCAwYzAgMCAwIDAgMCAwIi8+CiAgPC9nPgo8L3N2Zz4='

export default function Page() {
  const { theme } = useFela()
  const [maxLevel, setMaxLevel] = useState(40)
  const [sortBy, setSortBy] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')

  return (
    <>
      <Box
        padding={2}
        space={2}
        extend={{
          position: 'fixed',
          alignItems: 'baseline',
          backgroundColor: 'rgba(200, 200, 200, 0.5)',
          borderRadius: theme.roundedCorners,
          bottom: 12,
          right: 12,
        }}>
        <label htmlFor="best-buddy" style={{ fontSize: 14 }}>
          <input
            type="checkbox"
            id="best-buddy"
            name="best-buddy"
            value={maxLevel === 41}
            onChange={(e) => setMaxLevel(maxLevel === 40 ? 41 : 40)}
          />{' '}
          Best Buddy
        </label>
      </Box>
      <Template>
        <Box paddingTop={3} space={4}>
          <Layout>
            <Box direction="row" alignItems="flex-end" space={2}>
              <Box
                direction={['column', 'row']}
                space={2}
                alignItems={['flex-start', 'center']}>
                <Box as="label" htmlFor="sort-by">
                  Sort By
                </Box>
                <Box alignItems="flex-start">
                  <Box
                    value={sortBy}
                    as="select"
                    name="sort-by"
                    id="sort-by"
                    paddingTop={1}
                    paddingBottom={1}
                    paddingRight={3}
                    paddingLeft={3}
                    extend={{
                      fontSize: 18,
                      width: 180,
                      borderRadius: theme.roundedCorners,
                      backgroundColor: 'white',
                      appearance: 'none',
                      border: '1px solid rgb(170, 170, 170)',
                      backgroundSize: '12px 12px',
                      backgroundPosition: 'right 10px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage:
                        'url("data:image/svg+xml;base64,' + icon + '")',
                    }}
                    onChange={(e) => setSortBy(e.target.value)}>
                    <option value="id">Number</option>
                    <option value="name">Name</option>
                    <option value="type1">Type</option>
                    <option value="cp">Max CP</option>
                    <option value="attack">Attack</option>
                    <option value="defense">Defense</option>
                    <option value="stamina">Stamina</option>
                  </Box>
                </Box>
              </Box>

              <Box alignItems="flex-start">
                <Box
                  value={sortOrder}
                  as="select"
                  name="sort-orer"
                  id="sort-orer"
                  paddingTop={1}
                  paddingBottom={1}
                  paddingRight={3}
                  paddingLeft={3}
                  extend={{
                    fontSize: 18,
                    width: 180,
                    borderRadius: theme.roundedCorners,
                    backgroundColor: 'white',
                    appearance: 'none',
                    border: '1px solid rgb(170, 170, 170)',
                    backgroundSize: '12px 12px',
                    backgroundPosition: 'right 10px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                      'url("data:image/svg+xml;base64,' + icon + '")',
                  }}
                  onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Box>
              </Box>
            </Box>
          </Layout>
          <Layout>
            <Box space={2}>
              {pokedex
                .map((pokemon) => {
                  const poke = createPokemon(pokemon.name, {
                    attack: 15,
                    defense: 15,
                    stamina: 15,
                  })
                  const stats = poke.getStats(maxLevel)
                  const info = poke.getInfo()

                  return {
                    cp: stats.cp,
                    type1: info.type1,
                    type2: info.type2,
                    name: info.name,
                    attack: info.attack,
                    defense: info.defense,
                    stamina: info.stamina,
                    id: info.id,
                    ref: info.ref,
                  }
                })
                .sort((a, b) =>
                  sortOrder === 'asc'
                    ? a[sortBy] > b[sortBy]
                    : b[sortBy] > a[sortBy]
                )
                .map(
                  ({
                    cp,
                    type1,
                    type2,
                    name,
                    assetId,
                    attack,
                    defense,
                    stamina,
                    id,
                    ref,
                  }) => (
                    <Link href={`/#${name};15;15;15;${maxLevel}`} passHref>
                      <Box
                        as="a"
                        alignItems="center"
                        key={ref}
                        direction="row"
                        space={2}
                        padding={2}
                        paddingRight={3}
                        paddingLeft={3}
                        extend={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                          color: theme.colors.text,
                          borderRadius: theme.roundedCorners,
                          backgroundColor:
                            theme.colors.types[type1].backgroundColor + '33',
                        }}>
                        <Box alignItems="flex-start" alignSelf="flex-start">
                          <img
                            height={50}
                            width="auto"
                            src={getImageUrl(assetId)}
                          />
                        </Box>
                        <Box
                          grow={1}
                          shrink={1}
                          justifyContent="space-between"
                          alignItems="center"
                          direction="row">
                          <Box
                            alignItems="flex-start"
                            justifyContent="center"
                            space={0.5}>
                            <p
                              extend={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                              }}>
                              #{id} {name}
                            </p>
                            <Box direction="row" space={1} alignItems="center">
                              <TypeTile type={type1} />
                              {type2 ? <TypeTile type={type2} /> : null}
                            </Box>
                          </Box>
                          <Box alignItems="flex-end">
                            <p>
                              <strong>{cp} CP</strong>
                            </p>
                            <p>
                              {attack} / {defense} / {stamina}
                            </p>
                          </Box>
                        </Box>
                      </Box>
                    </Link>
                  )
                )}
            </Box>
          </Layout>
        </Box>
      </Template>
    </>
  )
}
