import React, { useContext } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import ChargeMove from '../components/ChargeMove'
import QuickMove from '../components/QuickMove'

import AppContext from '../utils/AppContext'

export default function Moves({ moves, thirdMove }) {
  const { focusMode, showRawDamage, moveType } = useContext(AppContext)

  return (
    <Box>
      <Layout>
        <Box space={4}>
          {focusMode ? null : (
            <Box>
              Third Move: {thirdMove.stardustToUnlock} Stardust /{' '}
              {thirdMove.candyToUnlock} Candies
            </Box>
          )}
          <Box space={4} direction={['column', , 'row']}>
            <Box space={2} grow={1} shrink={0} basis={['auto', , '0']}>
              <h3>Quick Moves</h3>
              <Box space={1}>
                {moves.quickMoves.map((move) => (
                  <QuickMove {...move} />
                ))}
                {moves.eliteQuickMoves.map((move) => (
                  <QuickMove isExclusive {...move} />
                ))}
              </Box>
            </Box>
            <Box space={2} grow={1} shrink={0} basis={['auto', , '0']}>
              <h3>Charge Moves</h3>
              <Box space={1}>
                {moves.chargeMoves.map((move) => (
                  <ChargeMove {...move} />
                ))}
                {moves.eliteChargeMoves.map((move) => (
                  <ChargeMove isExclusive {...move} />
                ))}
              </Box>
            </Box>
          </Box>
          {focusMode ? null : (
            <Box extend={{ fontSize: 12 }}>
              {showRawDamage ? null : (
                <p>* = STAB (Same Type Attacker Bonus)</p>
              )}
              {moveType === 'pvp' ? (
                <>
                  <p>DPT = Damage Per Turn</p>
                  <p>EPT = Energy Per Turn</p>
                </>
              ) : (
                <>
                  <p>DPS = Damage Per Second</p>
                  <p>EPS = Energy Per Second</p>
                </>
              )}
              <p>DPE = Damage Per Energy</p>
            </Box>
          )}
        </Box>
      </Layout>
    </Box>
  )
}
