function padLeft(value, length, pad) {
  return pad.repeat(length - value.length) + value
}

const formMap = {
  // special names
  Deoxys: 11,
  Runerigus: 31,
  Sirfetchd: 31,
  Perrserker: 31,
  Obstagoon: 31,
  Rotom: 11,
  Genesect: 11,
  'Meowstic ♀': '01',

  Alola: 61,
  Galarian: 31,
  Armored: 10,
  Plant: 11,
  Sandy: 12,
  Trash: 13,
  Sunny: 12,
  Rainy: 13,
  Snowy: 14,
  Attack: 12,
  Defense: 13,
  Speed: 14,
  Origin: 12,
  Zen: 12,
  Incarnate: 11,
  Therian: 12,
  White: 12,
  Black: 13,
  Douse: 12,
  Shock: 13,
  Burn: 14,
  Chill: 15,
  Fan: 15,
  Frost: 14,
  Heat: 12,
  Mow: 16,
  Wash: 13,
  Land: 11,
  Sky: 12,
  Spring: 11,
  Summer: 12,
  Autumn: 13,
  Winter: 14,
  Normal: 11,
  Fighting: 12,
  Flying: 13,
  Poison: 14,
  Ground: 15,
  Rock: 16,
  Bug: 17,
  Ghost: 18,
  Steel: 19,
  Fire: 20,
  Water: 21,
  Grass: 22,
  Electric: 23,
  Psychic: 24,
  Ice: 25,
  Dragon: 26,
  Dark: 27,
  Fairy: 28,
  Ordinary: 11,
  Resolute: 12,
  Aria: 11,
  Pirouette: 12,
}

const specialNames = {
  'Mewtwo (Armored)': 'pm0150_00_pgo_a',
}
export default function getImageURL(id, name, shiny = false) {
  let formId = '00'

  for (let form in formMap) {
    if (name.indexOf(form) !== -1) {
      formId = formMap[form]
    }
  }

  if (specialNames[name]) {
    return `/pokemon/pokemon_icon_${specialNames[name]}${
      shiny ? '_shiny' : ''
    }.png`
  }

  return `/pokemon/pokemon_icon_${padLeft(id.toString(), 3, '0')}_${formId}${
    shiny ? '_shiny' : ''
  }.png`
}
