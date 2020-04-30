import React, { useContext } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import TypeTile from '../components/TypeTile'

import formatPercent from '../utils/formatPercent'
import formatDecimal from '../utils/formatDecimal'
import FocusModeContext from '../utils/FocusModeContext'

const ValueDisplay = ({ name, children }) => (
  <Box grow={1} shrink={0} basis={0} alignItems="flex-start">
    <Box alignItems="center">
      <p>{children}</p>
      <span style={{ fontSize: 10 }}>{name}</span>
    </Box>
  </Box>
)

function QuickMove({
  isExclusive,
  name,
  hasStab,
  damage,
  energy,
  type,
  turns,
  actualDamage,
  actualDamagePerTurn,
  energyPerTurn,
}) {
  const { theme } = useFela()
  const stabFlag = hasStab ? '*' : null

  return (
    <Box
      space={1}
      padding={2}
      extend={{
        borderRadius: theme.roundedCorners,
        backgroundColor: theme.colors.types[type].backgroundColor + '33',
      }}>
      <Box direction="row" alignItems="center" space={1.5}>
        <span style={{ fontWeight: 600 }}>{name}</span>
        <TypeTile type={type} />
        {isExclusive ? (
          <span
            style={{
              fontSize: 12,
              lineHeight: 1,
              padding: 4,
              borderRadius: theme.roundedCorners,
              backgroundColor: 'red',
              color: 'white',
            }}>
            exclusive
          </span>
        ) : null}
      </Box>
      <Box direction="row" alignItems="center" space={1}>
        <ValueDisplay name="Damage">
          {formatDecimal(actualDamage)}
          {stabFlag}
        </ValueDisplay>
        <ValueDisplay name="Energy">{energy}</ValueDisplay>
        <ValueDisplay name="Turns">{turns}</ValueDisplay>
        <ValueDisplay name="DPT">
          {formatDecimal(actualDamagePerTurn)}
          {stabFlag}
        </ValueDisplay>
        <ValueDisplay name="EPT">{energyPerTurn}</ValueDisplay>
        <ValueDisplay name="DPT × EPT">
          {formatDecimal(actualDamagePerTurn * energyPerTurn)}
          {stabFlag}
        </ValueDisplay>
      </Box>
    </Box>
  )
}

function ChargeMove({
  isExclusive,
  name,
  hasStab,
  damage,
  energy,
  type,
  actualDamage,
  damagePerEnergy,
  actualDamagePerEnergy,
}) {
  const { theme } = useFela()
  const stabFlag = hasStab ? '*' : null

  return (
    <Box
      space={1}
      padding={2}
      extend={{
        borderRadius: theme.roundedCorners,
        backgroundColor: theme.colors.types[type].backgroundColor + '33',
      }}>
      <Box direction="row" alignItems="center" space={1.5}>
        <span style={{ fontWeight: 600 }}>{name}</span>
        <TypeTile type={type} />

        {isExclusive ? (
          <span
            style={{
              fontSize: 12,
              lineHeight: 1,
              padding: 4,
              borderRadius: theme.roundedCorners,
              backgroundColor: 'red',
              color: 'white',
            }}>
            exclusive
          </span>
        ) : null}
      </Box>
      <Box direction="row" alignItems="center" space={1}>
        <ValueDisplay name="Damage">
          {formatDecimal(actualDamage)}
          {stabFlag}
        </ValueDisplay>
        <ValueDisplay name="Energy">{energy}</ValueDisplay>
        <ValueDisplay name="DPE">
          {formatDecimal(actualDamagePerEnergy)}
          {stabFlag}
        </ValueDisplay>
      </Box>
    </Box>
  )
}

export default function Moves({ moves, thirdMove }) {
  const focusMode = useContext(FocusModeContext)

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
              <p>* = STAB (Same Type Attacker Bonus)</p>
              <p>DPT = Damage Per Turn</p>
              <p>EPT = Energy Per Turn</p>
              <p>DPE = Damage Per Energy</p>
            </Box>
          )}
        </Box>
      </Layout>
    </Box>
  )
}
