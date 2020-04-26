'use strict'

const fs = require('fs')
const request = require('request-promise')

const GAME_MASTER_URL =
  'https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/versions/latest/GAME_MASTER.json'

const normalizeName = (name) => {
  const newName = nameReplace[name]
    ? nameReplace[name]
    : name.indexOf('ALOLA') !== -1
    ? name.replace('_ALOLA', ' (Alola)')
    : name

  return newName.charAt(0) + newName.substr(1).toLowerCase()
}

const nameReplace = {
  NIDORAN_FEMALE: 'Nidoran (female)',
  NIDORAN_MALE: 'Nidoran (male)',
  MIME_JR: 'Mime Jr.',
  PORYGON_Z: 'Porygon-Z',
  MR_MIME: 'Mr. Mime',
  HO_OH: 'Ho-Oh',
}

let generate = async () => {
  const GAME_MASTER = await request.get({
    url: GAME_MASTER_URL,
    json: true,
  })

  // Examples:
  // V0001_POKEMON_BULBASAUR
  // V0122_POKEMON_MR_MIME
  // V0233_POKEMON_PORYGON2
  let pokemonTemplateIdPattern = /^V[0-9]{4}_POKEMON_[a-zA-Z0-9_]+$/

  const pokemonTemplates = GAME_MASTER.itemTemplate.filter((template) => {
    return pokemonTemplateIdPattern.test(template.templateId)
  })

  const pokemonList = []
  pokemonTemplates.map((template) => {
    const {
      pokemon: {
        uniqueId,
        form,
        evolutionBranch,
        type1,
        type2,
        quickMoves,
        cinematicMoves,
        stats,
      },
      templateId,
    } = template

    const name = normalizeName(
      form && form.indexOf('ALOLA') !== -1 ? form : uniqueId
    )

    if (!pokemonList.find((p) => p.name === name)) {
      pokemonList.push({
        name,
        id: parseInt(templateId.match(/[0-9]{4}/)[0]),
        attack: stats.baseAttack,
        defense: stats.baseDefense,
        stamina: stats.baseStamina,
        evolutions:
          evolutionBranch && evolutionBranch[0].evolution
            ? evolutionBranch.map((b) => b.evolution).map(normalizeName)
            : [],
        type1: type1.substr(13).toLowerCase(),
        type2: type2 ? type2.substr(13).toLowerCase() : undefined,
      })
    }
  })

  pokemonList.sort((a, b) => {
    return a.id - b.id
  })

  fs.writeFile(
    './data/pokedex.json',
    JSON.stringify(pokemonList, null, '  '),
    (err) => {
      if (err) {
        console.log(`Could not write file: ${err.message}.`)
        return process.exit(1)
      } else {
        console.log(
          `Successfully fetched ${pokemonList.length} Pokémon and updated their stats.`
        )
        console.log(
          `Please double check the file before creating a pull request!`
        )
      }
    }
  )
}

generate()
