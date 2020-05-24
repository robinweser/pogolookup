import formatDecimal from './formatDecimal'

import moves from '../data/moves.json'

export default function getQuickMoveStats(move, mode, types = []) {
  const { name, type } = moves[move]
  const { damage, energy, turns } = moves[move][mode]

  const hasStab = types.find((t) => t === type)
  const actualDamage = formatDecimal(damage * (hasStab ? 1.2 : 1))
  const dpt = formatDecimal(damage / turns)
  const adpt = formatDecimal(actualDamage / turns)
  const ept = formatDecimal(energy / turns)

  return {
    id: move,
    name,
    type,
    hasStab,
    damage,
    actualDamage,
    energy,
    turns,
    damagePerTurn: dpt,
    actualDamagePerTurn: adpt,
    energyPerTurn: ept,
    damagePerEnergy: dpt / ept,
    actualDamagePerEnergy: adpt / ept,
  }
}
