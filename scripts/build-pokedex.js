const fs = require('fs')
const request = require('request-promise')
const merge = require('deepmerge')

const overrides = require('../data/overrides.json')

const GAME_MASTER_URL =
  'https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/versions/latest/GAME_MASTER.json'

const forms = {
  ALOLA: '(Alolan)',
  GALARIAN: '(Galarian)',
  ORIGIN: '(Origin)',
  ALTERED: '(Altered)',
}

const capitalizeString = (str) => str.charAt(0) + str.substr(1).toLowerCase()

const normalizeName = (name) => {
  if (nameReplace[name]) {
    return nameReplace[name]
  }

  const newName = name.split('_').map(capitalizeString).join(' ')

  return Object.keys(forms).reduce(
    (n, form) => n.replace(capitalizeString(form), forms[form]),
    newName
  )
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
  let moveTemplateIdPattern = /^V[0-9]{4}_MOVE_[a-zA-Z0-9_]+$/
  let pvpMoveTemplateIdPattern = /^COMBAT_V[0-9]{4}_MOVE_[a-zA-Z0-9_]+$/

  const excludePokemon = { V0487_POKEMON_GIRATINA: true }

  const pokemonTemplates = GAME_MASTER.itemTemplate.filter((template) => {
    return excludePokemon[template.templateId]
      ? false
      : pokemonTemplateIdPattern.test(template.templateId)
  })

  const moveTemplates = GAME_MASTER.itemTemplate.filter((template) => {
    return moveTemplateIdPattern.test(template.templateId)
  })

  const pvpMoveTemplates = GAME_MASTER.itemTemplate.filter((template) => {
    return pvpMoveTemplateIdPattern.test(template.templateId)
  })

  const pokemonList = []
  pokemonTemplates.map((template) => {
    const {
      pokemon: {
        uniqueId,
        form,
        evolutionBranch,
        kmBuddyDistance,
        type1,
        type2,
        quickMoves,
        cinematicMoves,
        eliteQuickMove,
        eliteCinematicMove,
        thirdMove,
        stats,
      },
      templateId,
    } = template

    const ref =
      form && Object.keys(forms).find((f) => form.indexOf(f) !== -1)
        ? form
        : uniqueId
    const name = normalizeName(ref)

    if (!pokemonList.find((p) => p.name === name)) {
      pokemonList.push({
        name,
        ref: ref.toLowerCase(),
        id: parseInt(templateId.match(/[0-9]{4}/)[0]),
        attack: stats.baseAttack,
        defense: stats.baseDefense,
        stamina: stats.baseStamina,
        candyDistance: kmBuddyDistance,
        evolutions:
          evolutionBranch && evolutionBranch[0].evolution
            ? evolutionBranch
                .map((b) =>
                  b.form &&
                  Object.keys(forms).find((f) => b.form.indexOf(f) !== -1)
                    ? b.form
                    : b.evolution
                )
                .map(normalizeName)
            : [],
        type1: type1.substr(13).toLowerCase(),
        type2: type2 ? type2.substr(13).toLowerCase() : undefined,
        thirdMove,
        quickMoves,
        cinematicMoves,
        eliteQuickMoves: eliteQuickMove || [],
        eliteCinematicMoves: eliteCinematicMove || [],
      })
    }
  })

  pokemonList.sort((a, b) => {
    return a.id === b.id ? (a.name > b.name ? 1 : -1) : a.id - b.id
  })

  const moveList = {}
  moveTemplates.map((template) => {
    const {
      move: {
        power,
        pokemonType,
        movementId,
        energyDelta,
        accuracyChance,
        durationMs,
      },
      templateId,
    } = template

    moveList[movementId] = {
      name: movementId
        .replace('_FAST', '')
        .split('_')
        .map(normalizeName)
        .join(' '),
      type: pokemonType.substr(13).toLowerCase(),
      pve: {
        damage: power,
        energy: Math.abs(energyDelta),
        accuracy: accuracyChance,
        turns: durationMs / 1000,
      },
    }
  })

  pvpMoveTemplates.map((template) => {
    const {
      combatMove: { power, uniqueId, energyDelta, durationTurns },
    } = template

    moveList[uniqueId].pvp = {
      damage: power,
      energy: Math.abs(energyDelta),
      turns: durationTurns ? durationTurns + 1 : 1,
    }
  })

  Object.keys(overrides.pokedex).forEach((pokemon) => {
    const entry = pokemonList.find((item) => item.ref === pokemon)
    const index = pokemonList.indexOf(entry)

    pokemonList[index] = merge(entry, overrides.pokedex[pokemon])
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

  fs.writeFile(
    './data/moves.json',
    JSON.stringify(moveList, null, '  '),
    (err) => {
      if (err) {
        console.log(`Could not write file: ${err.message}.`)
        return process.exit(1)
      } else {
        console.log(
          `Successfully fetched ${
            Object.keys(moveList).length
          } moves and updated their stats.`
        )
        console.log(
          `Please double check the file before creating a pull request!`
        )
      }
    }
  )
}

generate()
