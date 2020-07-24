import React, { useContext } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import LabelledValue from './LabelledValue'
import TypeTile from './TypeTile'

import formatDecimal from '../utils/formatDecimal'
import AppContext from '../utils/AppContext'

function Effect({ value, stat, target }) {
  if (!value) {
    return null
  }

  return (
    <Box direction="row" extend={{ color: value > 0 ? 'green' : 'red' }}>
      {value > 0 ? '⬆︎' : '⬇︎'}
      {' '}
      {value * 25 + '%'} {target ? 'Target' : ''} {stat}
    </Box>
  )
}

export default function ChargeMove({
  isExclusive,
  name,
  hasStab,
  damage,
  energy,
  type,
  actualDamage,
  damagePerEnergy,
  actualDamagePerEnergy,
  buffs,
}) {
  const { theme } = useFela()
  const { showRawDamage } = useContext(AppContext)
  const stabFlag = hasStab && !showRawDamage ? '*' : null

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
        <LabelledValue name="Damage">
          {formatDecimal(showRawDamage ? damage : actualDamage)}
          {stabFlag}
        </LabelledValue>
        <LabelledValue name="Energy">{energy}</LabelledValue>
        <LabelledValue name="DPE">
          {formatDecimal(
            showRawDamage ? damagePerEnergy : actualDamagePerEnergy
          )}
          {stabFlag}
        </LabelledValue>
      </Box>
      {!buffs ? null : (
        <Box
          marginTop={1}
          padding={2}
          space={1}
          extend={{
            borderRadius: theme.roundedCorners,
            backgroundColor: 'rgba(0,0,0,0.05)',
            fontSize: 14,
          }}>
          <Box>{buffs.buffActivationChance * 100}% Chance</Box>
          <Box paddingLeft={3} extend={{ lineHeight: 1.2 }}>
            <Effect value={buffs.attackerAttackStatStageChange} stat="Attack" />
            <Effect
              value={buffs.attackerDefenseStatStageChange}
              stat="Attack"
            />
            <Effect
              value={buffs.targetAttackStatStageChange}
              stat="Defense"
              target
            />
            <Effect
              value={buffs.targetDefenseStatStageChange}
              stat="Defense"
              target
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}
