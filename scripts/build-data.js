const fs = require('fs')
const request = require('request-promise')
const merge = require('deepmerge')
const capitalizeString = require('capitalize-string')
const padLeft = require('pad-left')

const overrides = require('../data/overrides.json')
const types = require('../data/types.json')

const createPokemon = require('../utils/createPokemon').default

const GAME_MASTER_URL =
  'https://raw.githubusercontent.com/PokeMiners/game_masters/master/latest/latest.json'

const forms = {
  STANDARD: '',
  ALOLA: '(Alolan)',
  HISUIAN: '(Hisuian)',
  GALARIAN: '(Galarian)',
  ORIGIN: '(Origin)',
  ALTERED: '(Altered)',
  ARMORED: '(Armored)',
  LIBRE: '(Libre)',
  RAINY: '(Rainy)',
  SUNNY: '(Sunny)',
  SNOWY: '(Snowy)',
  ATTACK: '(Attack)',
  DEFENSE: '(Defense)',
  SPEED: '(Speed)',
  PLANT: '(Plant)',
  SANDY: '(Sandy)',
  TRASH: '(Trash)',
  OVERCAST: '(Overcast)',
  INCARNATE: '(Incarnate)',
  THERIAN: '(Therian)',
  FAN: '(Fan)',
  FROST: '(Frost)',
  HEAT: '(Heat)',
  MOW: '(Mow)',
  WASH: '(Wash)',
  LAND: '(Land)',
  SKY: '(Sky)',
  ZEN: '(Zen)',
  AUTUMN: '(Autumn)',
  WINTER: '(Winter)',
  SPRING: '(Spring)',
  SUMMER: '(Summer)',
  BLACK: '(Black)',
  WHITE: '(White)',
  BLUE: '(Blue)',
  ORANGE: '(Orange)',
  RED: '(Red)',
  YELLOW: '(Yellow)',
  GREEN: "(Green)",
  INDIGO: "(Indigo)",
  VIOLET: "(Violet)"
  ARIA: '(Aria)',
  PIROUETTE: '(Pirouette)',
  BURN: '(Burn)',
  CHILL: '(Chill)',
  DOUSE: '(Douse)',
  SHOCK: '(Shock)',
  ORDINARY: '(Ordinary)',
  RESOLUTE: '(Resolute)',
  DANDY: '(Dandy)',
  DEBUTANTE: '(Debutante)',
  DIAMOND: '(Diamond)',
  HEART: '(Heart)',
  KABUKI: '(Kabuki)',
  'LA REINE': '(La Reine)',
  MATRON: '(Matron)',
  NATURAL: '(Natural)',
  PHARAOH: '(Pharaoh)',
  STAR: '(Star)',
  AVERAGE: '(Average)',
  LARGE: '(Large)',
  SUPER: '(Super)',
  SMALL: '(Small)',
  'EAST SEA': '(East)',
  'WEST SEA': '(West)',
  UNBOUND: '(Unbound)',
  BAILE: '(Baile)',
  PAU: '(Pau)',
  POMPOM: '(Pompom)',
  SENSU: '(Sensu)',
  MIDNIGHT: '(Midnight)',
  MIDDAY: '(Midday)',
  DUSK: '(Dusk)',
  SCHOOL: '(School)',
  SOLO: '(Solo)',
  BUSTED: "(Busted)",
  DISGUISED: "(Disguised)"
}

for (let type in types) {
  forms[type.toUpperCase()] = '(' + capitalizeString(type.toLowerCase()) + ')'
}

const formMap = {
  VS_2019: 'PIKACHU_LIBRE',
  MEWTWO_A: 'MEWTWO_ARMORED',
}

const nameReplace = {
  NIDORAN_FEMALE: 'Nidoran ♀',
  NIDORAN_MALE: 'Nidoran ♂',
  MEOWSTIC: 'Meowstic ♂',
  FRILLISH: 'Frillish ♂',
  FRILLISH_FEMALE: 'Frillish ♀',
  PYROAR: 'Pyroar ♂',
  PYROAR_FEMALE: 'Pyroar ♀',
  JELLICENT: 'Jellicent ♂',
  JELLICENT_FEMALE: 'Jellicent ♀',
  MEOWSTIC_FEMALE: 'Meowstic ♀',
  MIME_JR: 'Mime Jr.',
  PORYGON_Z: 'Porygon-Z',
  MR_MIME: 'Mr. Mime',
  MR_MIME_GALARIAN: 'Mr. Mime (Galarian)',
  HO_OH: 'Ho-Oh',
}

const normalizeName = (name) => {
  name = name.replace('_NORMAL', '')

  if (nameReplace[name]) {
    return nameReplace[name]
  }

  const newName = name.toLowerCase().split('_').map(capitalizeString).join(' ')

  return Object.keys(forms).reduce(
    (n, form) =>
      n.replace(
        ' ' + capitalizeString(form.toLowerCase()),
        forms[form] ? ' ' + forms[form] : ''
      ),
    newName
  )
}

function getUsefulForm(form) {
  if (
    !form ||
    form.match(
      /PURIFIED|SHADOW|NORMAL|FALL_2019|COPY_2019|CONFINED|2020|2021|2022|2023|STRIPED|ROCK_STAR|FLYING|POP_STAR|KARIYUSHI/gi
    ) !== null
  ) {
    return undefined
  }

  for (let key in formMap) {
    if (form.indexOf(key) !== -1) {
      return formMap[key]
    }

    if (form.match(/_S$/)) {
      return 'SHADOW'
    }
  }

  return form
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
  let formTemplateIdPattern = /^FORMS_V[0-9]{4}_POKEMON_[a-zA-Z0-9_]+$/

  const excludePokemon = {
    V0422_POKEMON_SHELLOS: true,
    V0423_POKEMON_GASTRODON: true,
    V0487_POKEMON_GIRATINA: true,
    V0412_POKEMON_BURMY: true,
    VO413_POKEMON_BURMADAM: true,
    V0421_POKEMON_CHERRIM: true,
    V0479_POKEMON_ROTOM: true,
    V0492_POKEMON_SHAYMIN: true,
    V0585_POKEMON_DEERLING: true,
    V0586_POKEMON_SAWSBUCK: true,
    V0641_POKEMON_TORNADUS: true,
    V0642_POKEMON_THUNDURUS: true,
    V0645_POKEMON_LANDORUS: true,
    V0647_POKEMON_KELDEO: true,
    V0648_POKEMON_MELOETTA: true,
    V0669_POKEMON_FLABEBE: true,
    V0670_POKEMON_FLOETTE: true,
    V0671_POKEMON_FLORGES: true,
    V0676_POKEMON_FURFROU: true,
    V0741_POKEMON_ORICORIO: true,
    V0745_POKEMON_LICANROC: true,
    V0746_POKEMON_WISHIWASHI: true,
  }

  const pokemonTemplates = GAME_MASTER.filter((template) =>
    excludePokemon[template.templateId]
      ? false
      : pokemonTemplateIdPattern.test(template.templateId)
  )

  const moveTemplates = GAME_MASTER.filter((template) =>
    moveTemplateIdPattern.test(template.templateId)
  )

  const pvpMoveTemplates = GAME_MASTER.filter((template) =>
    pvpMoveTemplateIdPattern.test(template.templateId)
  )

  const formTemplates = GAME_MASTER.filter((template) =>
    formTemplateIdPattern.test(template.templateId)
  )

  let pokemonList = []
  pokemonTemplates.map((template) => {
    const templateId = template.data.templateId

    if (!template.data.pokemonSettings) {
      return
    }

    const {
      pokemonId,
      form,
      evolutionBranch,
      kmBuddyDistance,
      type: type1,
      type2,
      quickMoves,
      cinematicMoves,
      eliteQuickMove,
      eliteCinematicMove,
      thirdMove,
      stats,
    } = template.data.pokemonSettings

    let formType
    if (form) {
      formType = form.replace(pokemonId + '_', '').replace('NORMAL', '')
    }

    const ref = getUsefulForm(form) || pokemonId
    const name = normalizeName(ref)
    const id = parseInt(templateId.match(/[0-9]{4}/)[0])

    let formId = 0
    let assetId

    const formData = formTemplates.find(
      (template) => template.data.formSettings.pokemon === pokemonId
    )

    if (formData && formData.data && formData.data.formSettings.forms) {
      const formInfo = formData.data.formSettings.forms.find(
        (f) => form && f.form === form
      )

      if (formInfo) {
        formId = formInfo.assetBundleValue || formInfo.assetBundleSuffix || 0

        if (formInfo.assetBundleSuffix) {
          assetId = formInfo.assetBundleSuffix
        }
      }
    }

    if (!assetId) {
      assetId = padLeft(id, 3, '0') + '_' + padLeft(formId, 2, '0')
    }

    const preEvolutions = pokemonList
      .filter((poke) => poke.evolutions.indexOf(name) !== -1)
      .map((poke) => poke.name)

    if (!pokemonList.find((p) => p.name === name)) {
      pokemonList.push({
        name,
        ref: ref.toLowerCase(),
        id,
        formId,
        formType,
        assetId,
        attack: stats.baseAttack,
        defense: stats.baseDefense,
        stamina: stats.baseStamina,
        candyDistance: kmBuddyDistance,
        evolutions:
          evolutionBranch && evolutionBranch[0].evolution
            ? evolutionBranch
                .map((b) => getUsefulForm(b.form) || b.evolution)
                .map(normalizeName)
                .filter((name) => name !== 'Shadow')
            : [],
        preEvolutions,
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

  const moveList = {}
  moveTemplates.map((template) => {
    const {
      moveSettings: {
        power,
        pokemonType,
        movementId,
        energyDelta,
        accuracyChance,
        durationMs,
      },
      templateId,
    } = template.data

    moveList[movementId] = {
      name: movementId
        .replace('_FAST', '')
        .split('_')
        .map(normalizeName)
        .join(' '),
      type: pokemonType.substr(13).toLowerCase(),
      pve: {
        damage: power || 0,
        energy: Math.abs(energyDelta) || 0,
        accuracy: accuracyChance,
        turns: durationMs / 1000,
      },
    }
  })

  pvpMoveTemplates.map((template) => {
    const {
      combatMove: { power, uniqueId, energyDelta, durationTurns, buffs },
    } = template.data

    moveList[uniqueId].pvp = {
      damage: power || 0,
      energy: Math.abs(energyDelta) || 0,
      turns: durationTurns ? durationTurns + 1 : 1,
      buffs,
    }
  })

  Object.keys(overrides.pokedex).forEach((pokemon) => {
    const entry = pokemonList.find((item) => item.ref === pokemon)
    const index = pokemonList.indexOf(entry)

    if (index >= 0) {
      pokemonList[index] = merge(entry, overrides.pokedex[pokemon])
    } else {
      pokemonList.push(overrides.pokedex[pokemon])
    }
  })

  pokemonList = pokemonList.sort((a, b) => {
    return a.id === b.id ? (a.name > b.name ? 1 : -1) : a.id - b.id
  })

  Object.keys(overrides.moves).forEach((move) => {
    moveList[move] = merge(moveList[move], overrides.moves[move])
  })

  // clean up old unused moves
  for (let key in moveList) {
    if (
      !moveList[key].hasOwnProperty('pvp') ||
      moveList[key].name.indexOf('Blastoise') !== -1
    ) {
      delete moveList[key]
    }
  }

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
      }
    }
  )
}

generate()
