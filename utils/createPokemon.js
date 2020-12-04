import pokedex from '../data/pokedex.json'
import cpm from '../data/cpm.json'
import cpm2 from '../data/cpm2.json'
import cpm4 from '../data/cpm4.json'
import types from '../data/types.json'
import moves from '../data/moves.json'

import binarySearch from './binarySearch'
import formatDecimal from './formatDecimal'
import getTypeMultipliers from './getTypeMultipliers'
import getQuickMoveStats from './getQuickMoveStats'
import getChargeMoveStats from './getChargeMoveStats'

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

    getPreEvolutions(preEvolutions = []) {
      const preEvos = poke._getPreEvolutions(pokemon)

      preEvos.forEach((evo) => {
        preEvolutions.push(evo)
        evo.getPreEvolutions(preEvolutions)
      })

      return preEvolutions.reverse()
    },

    _getPreEvolutions(pokemon) {
      return (pokemon.preEvolutions || []).map((name) =>
        createPokemon(name, ivs)
      )
    },

    getTypes() {
      return [pokemon.type1, pokemon.type2].filter(Boolean)
    },

    getTypeMultipliers() {
      return getTypeMultipliers(this.getTypes())
    },

    getMoves(mode = 'pvp') {
      const pokeTypes = this.getTypes()
      const quickMoves = pokemon.quickMoves.map((move) =>
        getQuickMoveStats(move, mode, pokeTypes)
      )
      const eliteQuickMoves = pokemon.eliteQuickMoves.map((move) =>
        getQuickMoveStats(move, mode, pokeTypes)
      )
      const chargeMoves = pokemon.cinematicMoves.map((move) =>
        getChargeMoveStats(move, mode, pokeTypes)
      )
      const eliteChargeMoves = pokemon.eliteCinematicMoves.map((move) =>
        getChargeMoveStats(move, mode, pokeTypes)
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
        hp: Math.floor(sta * cpm[levelMultiplier]),
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

    getCPRangeAtLevel(level, minIV = 0) {
      return {
        min: createPokemon(name, {
          attack: minIV,
          defense: minIV,
          stamina: minIV,
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

      for (let level = 1; level <= 51; level += 0.5) {
        cps.push(Math.max(10, poke.getStats(level).cp))
      }

      return cps
    },
  }

  return poke
}

export function createPokemonById(id, stats) {
  return createPokemon(pokedex.find((p) => p.id === id).name, stats)
}
