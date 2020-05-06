import formatDecimal from './formatDecimal'

import moves from '../data/moves.json'

export default function getChargeMoveStats(move, mode, types = []) {
  const { name, type } = moves[move]
  const { damage, energy } = moves[move][mode]

  const hasStab = types.find((t) => t === type)
  const actualDamage = formatDecimal(damage * (hasStab ? 1.2 : 1))

  return {
    name,
    type,
    hasStab,
    damage,
    actualDamage,
    energy,
    damagePerEnergy: damage / energy,
    actualDamagePerEnergy: actualDamage / energy,
  }
}
