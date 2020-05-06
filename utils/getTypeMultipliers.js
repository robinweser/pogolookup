import formatDecimal from './formatDecimal'

import types from '../data/types.json'

export default function getTypeMultipliers(inputTypes) {
  return Object.keys(types).reduce((multipliers, type) => {
    multipliers[type] = inputTypes.reduce((multiplier, t) => {
      return formatDecimal(multiplier * (types[t].takes[type] || 1), 3)
    }, 1)

    return multipliers
  }, {})
}
