import pokedex from '../data/pokedex.json'
import cpm from '../data/cpm.json'
import cpm2 from '../data/cpm2.json'
import cpm4 from '../data/cpm4.json'
import types from '../data/types.json'
import moves from '../data/moves.json'

import binarySearch from './binarySearch'
import formatDecimal from './formatDecimal'

export default function createPokemon(name, ivs = {}) {
  const pokemon = pokedex.find((pokemon) => pokemon.name === name)
  const { attack, defense, stamina } = ivs

  const poke = {
    getInfo() {
      return pokemon
    },

    getEvolutions(evolutions = []) {
      const evos = poke._getEvolutions(pokemon)

      evos.forEach((evolution) => {
        evolutions.push(evolution)
        evolution.getEvolutions(evolutions)
      })

      return evolutions
    },

    _getEvolutions(pokemon) {
      return (pokemon.evolutions || []).map((name) => createPokemon(name, ivs))
    },

    getTypeMultipliers() {
      const pokeTypes = [pokemon.type1, pokemon.type2].filter(Boolean)

      return Object.keys(types).reduce((multipliers, type) => {
        multipliers[type] = pokeTypes.reduce((multiplier, t) => {
          return formatDecimal(multiplier * (types[t].takes[type] || 1), 3)
        }, 1)

        return multipliers
      }, {})
    },

    getMoves(mode = 'pvp') {
      const quickMoves = pokemon.quickMoves.map((move) =>
        poke._getQuickMoveStats(move, mode)
      )
      const eliteQuickMoves = pokemon.eliteQuickMoves.map((move) =>
        poke._getQuickMoveStats(move, mode)
      )
      const chargeMoves = pokemon.cinematicMoves.map((move) =>
        poke._getChargeMoveStats(move, mode)
      )
      const eliteChargeMoves = pokemon.eliteCinematicMoves.map((move) =>
        poke._getChargeMoveStats(move, mode)
      )

      return {
        quickMoves,
        eliteQuickMoves,
        chargeMoves,
        eliteChargeMoves,
      }
    },

    getStats(level) {
      const atk = pokemon.attack + attack
      const def = pokemon.defense + defense
      const sta = pokemon.stamina + stamina
      const levelMultiplier = (level - 1) * 2

      return {
        level,
        attackIV: attack,
        attackBase: pokemon.attack,
        attackSum: atk,
        attackStat: Math.floor(atk * cpm[levelMultiplier] * 100) / 100,
        defenseIV: defense,
        defenseBase: pokemon.defense,
        defenseSum: def,
        defenseStat: Math.floor(def * cpm[levelMultiplier] * 100) / 100,
        staminaIV: stamina,
        staminaBase: pokemon.stamina,
        staminaSum: sta,
        staminaStat: Math.floor(sta * cpm[levelMultiplier] * 100) / 100,
        cp: Math.floor(
          (atk * Math.sqrt(def * sta) * cpm2[levelMultiplier]) / 10
        ),
        product: Math.floor(
          cpm2[levelMultiplier] *
            atk *
            def *
            Math.floor(cpm[levelMultiplier] * sta)
        ),
      }
    },

    getLevelByCP(cp) {
      const cps = poke._getCpCombinations()
      const index = cps.indexOf(cp)
      if (index === -1) {
        return null
      }

      return index / 2 + 1
    },

    getCPRangeAtLevel(level) {
      return {
        min: createPokemon(name, {
          attack: 0,
          defense: 0,
          stamina: 0,
        }).getStats(level).cp,
        max: createPokemon(name, {
          attack: 15,
          defense: 15,
          stamina: 15,
        }).getStats(level).cp,
      }
    },

    getPVPRankings({ maxLevel = 40, minIV = 0, CPCap = 1500 } = {}) {
      const maxLevelMultiplier = (maxLevel - 1) * 2

      function getCappedLevel(attack, defense, stamina) {
        const atk = pokemon.attack + attack
        const def = pokemon.defense + defense
        const sta = pokemon.stamina + stamina

        const cap = binarySearch(
          cpm4,
          ((CPCap + 1) * (CPCap + 1) * 100) / (atk * atk * def * sta)
        )

        return cap > maxLevelMultiplier ? maxLevelMultiplier : cap
      }

      const baseStats = poke.getStats(1)

      const combos = []
      for (let atk = minIV; atk <= 15; ++atk) {
        for (let def = minIV; def <= 15; ++def) {
          for (let sta = minIV; sta <= 15; ++sta) {
            combos.push({ attack: atk, defense: def, stamina: sta })
          }
        }
      }

      const products = []

      for (let i = 0; i < combos.length; ++i) {
        const combo = combos[i]

        products.push(
          createPokemon(name, {
            attack: combo.attack,
            defense: combo.defense,
            stamina: combo.stamina,
          }).getStats(
            getCappedLevel(combo.attack, combo.defense, combo.stamina) / 2 + 1
          )
        )
      }

      const sorted = products.sort((a, b) => {
        if (a.product === b.product) {
          return a.cp > b.cp ? -1 : 1
        }

        return a.product > b.product ? -1 : 1
      })

      return products
    },

    _getCpCombinations() {
      const cps = []

      for (let level = 1; level <= 41; level += 0.5) {
        cps.push(Math.max(10, poke.getStats(level).cp))
      }

      return cps
    },

    _getQuickMoveStats(move, mode) {
      const { name, type } = moves[move]
      const { damage, energy, turns } = moves[move][mode]

      const hasStab = type === pokemon.type1 || type === pokemon.type2
      const actualDamage = formatDecimal(damage * (hasStab ? 1.2 : 1))
      const dpt = formatDecimal(damage / turns)
      const adpt = formatDecimal(actualDamage / turns)
      const ept = formatDecimal(energy / turns)

      return {
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
        actualDamagePerTurn: adpt / ept,
      }
    },

    _getChargeMoveStats(move, mode) {
      const { name, type } = moves[move]
      const { damage, energy } = moves[move][mode]

      const hasStab = type === pokemon.type1 || type === pokemon.type2
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
    },
  }
  return poke
}

export function createPokemonById(id, stats) {
  return createPokemon(pokedex.find((p) => p.id === id).name, stats)
}
