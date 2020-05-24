import moves from '../data/moves.json'

import getChargeMoveStats from './getChargeMoveStats'

export default function getDamage(
  attacker,
  attackerLevel,
  defender,
  defenderLevel,
  move
) {
  const attackerStats = attacker.getStats(attackerLevel)
  const defenderStats = defender.getStats(defenderLevel)
  const typeMultipliers = defender.getTypeMultipliers()

  const { actualDamage, type } = getChargeMoveStats(
    move,
    'pvp',
    attacker.getTypes()
  )

  return (
    Math.floor(
      ((0.5 * actualDamage * attackerStats.attackStat) /
        defenderStats.defenseStat) *
        1.3 *
        typeMultipliers[type]
    ) + 1
  )
}
