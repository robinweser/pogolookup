const fs = require('fs')
const request = require('request-promise')

const createPokemon = require('../utils/createPokemon').default
const pokemonList = require('../data/pokedex.json')

const PVPOKE_RANKINGS = {
  great:
    'https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/gobattleleague/overall/rankings-1500.json',
  ultra:
    'https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/gobattleleague/overall/rankings-2500.json',
  master:
    'https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/gobattleleague/overall/rankings-10000.json',
}

let generate = async () => {
  const pvpStats = {}

  function getPvpStats({ attackIV, defenseIV, staminaIV, level, cp, hp }) {
    return {
      attack: attackIV,
      defense: defenseIV,
      stamina: staminaIV,
      level,
      cp,
      hp,
    }
  }

  pokemonList.map((pokemon) => {
    const poke = createPokemon(pokemon.name, {
      attack: 0,
      defense: 0,
      stamina: 0,
    })

    const great = poke.getPVPRankings({ CPCap: 1500 })
    const ultra = poke.getPVPRankings({ CPCap: 2500 })
    const master = poke.getPVPRankings({ CPCap: 10000 })

    pvpStats[pokemon.name] = {
      great: getPvpStats(great[49]),
      ultra: getPvpStats(ultra[49]),
      master: getPvpStats(master[49]),
    }
  })

  const great = await request.get({
    url: PVPOKE_RANKINGS.great,
    json: true,
  })

  const ultra = await request.get({
    url: PVPOKE_RANKINGS.ultra,
    json: true,
  })

  const master = await request.get({
    url: PVPOKE_RANKINGS.master,
    json: true,
  })

  fs.writeFile(
    './data/pvpstats.json',
    JSON.stringify(pvpStats, null, '  '),
    (err) => {
      if (err) {
        console.log(`Could not write file: ${err.message}.`)
        return process.exit(1)
      }
      console.log('Successfully extracted pvp stats for each pokemon.')
    }
  )

  fs.writeFile(
    './data/pvprankings.json',
    JSON.stringify(
      {
        great,
        ultra,
        master,
      },
      null,
      '  '
    ),
    (err) => {
      if (err) {
        console.log(`Could not write file: ${err.message}.`)
        return process.exit(1)
      }
      console.log('Successfully fetched all pvp rankings from pvpoke.')
    }
  )
}

generate()
