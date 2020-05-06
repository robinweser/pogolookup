import React, { useContext } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import LabelledValue from './LabelledValue'
import TypeTile from './TypeTile'

import formatDecimal from '../utils/formatDecimal'
import AppContext from '../utils/AppContext'

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
    </Box>
  )
}
