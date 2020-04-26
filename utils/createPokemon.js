import pokedex from '../data/pokedex.json'
import cpm from '../data/cpm.json'
import cpm2 from '../data/cpm2.json'
import cpm4 from '../data/cpm4.json'

import binarySearch from './binarySearch'

export default function createPokemon(name, { attack, defense, stamina } = {}) {
  const pokemon = pokedex.find((pokemon) => pokemon.name === name)

  const poke = {
    getPokemon() {
      return pokemon
    },

    getStats(level) {
      const atk = pokemon.attack + attack
      const def = pokemon.defense + defense
      const sta = pokemon.stamina + stamina
      const levelMultiplier = (level - 1) * 2

      return {
        name: pokemon.name,
        id: pokemon.id,
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

    _getCpCombinations() {
      const cps = []

      for (let level = 1; level <= 41; level += 0.5) {
        cps.push(Math.max(10, poke.getStats(level).cp))
      }

      return cps
    },

    getLevelByCP(cp) {
      const cps = poke._getCpCombinations()
      const index = cps.indexOf(cp)
      if (index === -1) {
        return null
      }

      return index / 2 + 1
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

      const sorted = products.sort((a, b) => (a.product > b.product ? -1 : 1))

      return products
    },
  }
  return poke
}

export function createPokemonById(id, stats) {
  return createPokemon(pokedex.find((p) => p.id === id).name, stats)
}
