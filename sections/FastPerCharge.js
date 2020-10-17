import React, { useContext } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'

export default function FastPerCharge({ moves }) {
  const { theme } = useFela()

  const quickMoves = [...moves.quickMoves, ...moves.eliteQuickMoves]
  const chargeMoves = [...moves.chargeMoves, ...moves.eliteChargeMoves]

  return (
    <Box>
      <Layout>
        <Box
          direction="row"
          paddingTop={1}
          paddingBottom={1}
          extend={{ fontWeight: 700 }}>
          <Box grow={1} shrink={0} basis={0}>
            Fast Move
          </Box>
          <Box grow={1} shrink={0} basis={0}>
            Charge Move
          </Box>
          <Box
            grow={0}
            shrink={0}
            basis={30}
            justifyContent="center"
            alignItems="flex-end">
            1
          </Box>
          <Box
            grow={0}
            shrink={0}
            basis={30}
            justifyContent="center"
            alignItems="flex-end">
            2
          </Box>
          <Box
            grow={0}
            shrink={0}
            basis={30}
            justifyContent="center"
            alignItems="flex-end">
            3
          </Box>
        </Box>
        {quickMoves.map((quickMove) => (
          <Box paddingTop={3}>
            {chargeMoves.map((chargeMove) => {
              const first = Math.ceil(chargeMove.energy / quickMove.energy)
              const second = Math.ceil(
                (chargeMove.energy * 2) / quickMove.energy
              )
              const third = Math.ceil(
                (chargeMove.energy * 3) / quickMove.energy
              )

              return (
                <Box direction="row" paddingTop={0.5} paddingBottom={0.5}>
                  <Box grow={1} shrink={0} basis={0}>
                    <Box
                      padding={1.5}
                      alignSelf="flex-start"
                      extend={{
                        borderRadius: theme.roundedCorners,
                        backgroundColor:
                          theme.colors.types[quickMove.type].backgroundColor +
                          '66',
                      }}>
                      {quickMove.name}
                    </Box>
                  </Box>
                  <Box grow={1} shrink={0} basis={0}>
                    <Box
                      padding={1.5}
                      alignSelf="flex-start"
                      extend={{
                        borderRadius: theme.roundedCorners,
                        backgroundColor:
                          theme.colors.types[chargeMove.type].backgroundColor +
                          '66',
                      }}>
                      {chargeMove.name}
                    </Box>
                  </Box>
                  <Box
                    grow={0}
                    shrink={0}
                    basis={30}
                    justifyContent="center"
                    alignItems="flex-end">
                    {first}
                  </Box>
                  <Box
                    grow={0}
                    shrink={0}
                    basis={30}
                    justifyContent="center"
                    alignItems="flex-end">
                    {second - first}
                  </Box>
                  <Box
                    grow={0}
                    shrink={0}
                    basis={30}
                    justifyContent="center"
                    alignItems="flex-end">
                    {third - second}
                  </Box>
                </Box>
              )
            })}
          </Box>
        ))}
      </Layout>
    </Box>
  )
}
