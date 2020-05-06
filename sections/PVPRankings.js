import React from 'react'
import Link from 'next/link'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'

import formatPercent from '../utils/formatPercent'
import formatDecimal from '../utils/formatDecimal'

const rankMap = {
  '0.9': 'grass',
  '0.75': 'bug',
  '0.5': 'electric',
  '0.3': 'fire',
  '0.0': 'fighting',
}

const Cell = ({ children, extend }) => (
  <Box padding={2} grow={1} shrink={0} basis={0} extend={extend}>
    {children}
  </Box>
)

export default function PVPRankings({ pvpRankings, ivs }) {
  const { theme } = useFela()

  const selected = pvpRankings.find(
    (r) =>
      r.attackIV === ivs.attack &&
      r.defenseIV === ivs.defense &&
      r.staminaIV === ivs.stamina
  )

  const rank = 1 + pvpRankings.indexOf(selected)
  const percent = selected.product / pvpRankings[0].product
  const best = pvpRankings[0]

  const bgColor =
    theme.colors.types[
      rankMap[
        Object.keys(rankMap).find(
          (rating) =>
            (pvpRankings.length - rank) / pvpRankings.length >=
            parseFloat(rating)
        )
      ]
    ].backgroundColor + '66'

  return (
    <Box>
      <Layout>
        <Box>
          <Box
            display={['none', , 'flex']}
            direction="row"
            extend={{ fontWeight: 600 }}>
            <Cell extend={{ flex: '0 0 50px' }}>#</Cell>
            <Box grow={1} direction={['column', , 'row']}>
              <Box grow={4} shrink={0} basis={0} direction="row">
                <Cell>IVs</Cell>
                <Cell>Lvl</Cell>
                <Cell>CP</Cell>
                <Cell>%</Cell>
              </Box>
              <Box grow={3} shrink={0} basis={0} direction="row">
                <Cell>Atk</Cell>
                <Cell>Def</Cell>
                <Cell>HP</Cell>
              </Box>
            </Box>
          </Box>

          <Box
            direction="row"
            extend={{
              borderRadius: theme.roundedCorners,
              backgroundColor: bgColor,
            }}>
            <Cell extend={{ flex: '0 0 50px', fontWeight: 700 }}>{rank}</Cell>
            <Box grow={1} direction={['column', , 'row']}>
              <Box grow={4} shrink={0} basis={['auto', , 0]} direction="row">
                <Cell>
                  <Box display={['flex', , 'none']} extend={{ fontSize: 10 }}>
                    IVs
                  </Box>
                  {[
                    selected.attackIV,
                    selected.defenseIV,
                    selected.staminaIV,
                  ].join(' / ')}
                </Cell>
                <Cell
                  extend={{
                    display: 'none',
                    large: { display: 'flex' },
                  }}>
                  {selected.level}
                </Cell>
                <Cell>
                  <Box display={['flex', , 'none']} extend={{ fontSize: 10 }}>
                    CP / Level
                  </Box>
                  <Box direction="row">
                    {selected.cp}
                    {' '}
                    <Box display={['flex', , 'none']}>({selected.level})</Box>
                  </Box>
                </Cell>
                <Cell>
                  <Box display={['flex', , 'none']} extend={{ fontSize: 10 }}>
                    Percent
                  </Box>
                  {formatPercent(selected.product / pvpRankings[0].product)}
                </Cell>
              </Box>
              <Box grow={3} shrink={0} basis={['auto', , 0]} direction="row">
                <Cell>
                  <Box display={['flex', , 'none']} extend={{ fontSize: 10 }}>
                    Attack
                  </Box>
                  {formatDecimal(selected.attackStat)}
                  <br />({best.attackStat - selected.attackStat > 0 ? '-' : '+'}
                  {Math.abs(
                    formatDecimal(best.attackStat - selected.attackStat)
                  )}
                  )
                </Cell>
                <Cell>
                  <Box display={['flex', , 'none']} extend={{ fontSize: 10 }}>
                    Defense
                  </Box>
                  {formatDecimal(selected.defenseStat)}
                  <br />(
                  {best.defenseStat - selected.defenseStat > 0 ? '-' : '+'}
                  {Math.abs(
                    formatDecimal(best.defenseStat - selected.defenseStat)
                  )}
                  )
                </Cell>
                <Cell>
                  <Box display={['flex', , 'none']} extend={{ fontSize: 10 }}>
                    Stamina
                  </Box>
                  {Math.floor(selected.staminaStat)}
                  <br />(
                  {Math.floor(best.staminaStat) -
                    Math.floor(selected.staminaStat) >
                  0
                    ? '-'
                    : '+'}
                  {Math.floor(
                    Math.abs(
                      formatDecimal(
                        Math.floor(best.staminaStat) -
                          Math.floor(selected.staminaStat)
                      )
                    )
                  )}
                  )
                </Cell>
              </Box>
            </Box>
          </Box>
          {pvpRankings
            .slice(0, 25)
            .map(
              (
                {
                  attackIV,
                  defenseIV,
                  staminaIV,
                  attackStat,
                  defenseStat,
                  staminaStat,
                  product,
                  level,
                  cp,
                },
                i
              ) =>
                i === rank - 1 ? null : (
                  <Box
                    direction="row"
                    extend={{
                      borderBottom: '1px solid rgb(200, 200, 200)',
                      ':last-child': {
                        borderBottom: 0,
                      },
                    }}>
                    <Cell
                      extend={{
                        flex: '0 0 50px',
                      }}>
                      {i + 1}
                    </Cell>
                    <Box grow={1} direction={['column', , 'row']}>
                      <Box
                        grow={4}
                        shrink={0}
                        basis={['auto', , 0]}
                        direction="row">
                        <Cell>
                          <Box
                            display={['flex', , 'none']}
                            extend={{ fontSize: 10 }}>
                            IVs
                          </Box>
                          {[attackIV, defenseIV, staminaIV].join(' / ')}
                        </Cell>
                        <Cell
                          extend={{
                            display: 'none',
                            large: { display: 'flex' },
                          }}>
                          {level}
                        </Cell>
                        <Cell>
                          <Box
                            display={['flex', , 'none']}
                            extend={{ fontSize: 10 }}>
                            CP / Level
                          </Box>
                          <Box direction="row">
                            {cp}
                            {' '}
                            <Box display={['flex', , 'none']}>({level})</Box>
                          </Box>
                        </Cell>
                        <Cell>
                          <Box
                            display={['flex', , 'none']}
                            extend={{ fontSize: 10 }}>
                            Percent
                          </Box>
                          {formatPercent(product / pvpRankings[0].product)}
                        </Cell>
                      </Box>
                      <Box
                        grow={3}
                        shrink={0}
                        basis={['auto', , 0]}
                        direction="row">
                        <Cell>
                          <Box
                            display={['flex', , 'none']}
                            extend={{ fontSize: 10 }}>
                            Attack
                          </Box>
                          {formatDecimal(attackStat)}
                        </Cell>
                        <Cell>
                          <Box
                            display={['flex', , 'none']}
                            extend={{ fontSize: 10 }}>
                            Defense
                          </Box>
                          {formatDecimal(defenseStat)}
                        </Cell>
                        <Cell>
                          <Box
                            display={['flex', , 'none']}
                            extend={{ fontSize: 10 }}>
                            Stamina
                          </Box>
                          {Math.floor(staminaStat)}
                        </Cell>
                      </Box>
                    </Box>
                  </Box>
                )
            )}
        </Box>
      </Layout>
    </Box>
  )
}
