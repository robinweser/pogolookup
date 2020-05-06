import React, { useContext } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import LabelledValue from './LabelledValue'
import TypeTile from './TypeTile'

import formatDecimal from '../utils/formatDecimal'
import AppContext from '../utils/AppContext'

export default function QuickMove({
  isExclusive,
  name,
  hasStab,
  damage,
  damagePerTurn,
  energy,
  energyPerTurn,
  type,
  turns,
  actualDamage,
  actualDamagePerTurn,
}) {
  const { theme } = useFela()
  const { showRawDamage, moveType } = useContext(AppContext)
  const stabFlag = hasStab && !showRawDamage ? '*' : null
  const isPVE = moveType === 'pve'

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
        <LabelledValue name={isPVE ? 'Duration' : 'Turns'}>
          {turns}
          {isPVE ? 's' : null}
        </LabelledValue>
        <LabelledValue name={isPVE ? 'DPS' : 'DPT'}>
          {formatDecimal(showRawDamage ? damagePerTurn : actualDamagePerTurn)}
          {stabFlag}
        </LabelledValue>
        <LabelledValue name={isPVE ? 'EPS' : 'EPT'}>
          {energyPerTurn}
        </LabelledValue>
        <LabelledValue name={isPVE ? 'DPS × EPS' : 'DPT × EPS'}>
          {formatDecimal(
            (showRawDamage ? damagePerTurn : actualDamagePerTurn) *
              energyPerTurn
          )}
          {stabFlag}
        </LabelledValue>
      </Box>
    </Box>
  )
}
