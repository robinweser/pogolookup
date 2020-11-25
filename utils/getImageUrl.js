function padLeft(value, length, pad) {
  return pad.repeat(length - value.length) + value
}

const formMap = {
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
}

export default function getImageURL(id, name) {
  let formId = '00'

  for (let form in formMap) {
    if (name.indexOf(form) !== -1) {
      formId = formMap[form]
    }
  }

  return `/pokemon/pokemon_icon_${padLeft(id.toString(), 3, '0')}_${formId}.png`
}
