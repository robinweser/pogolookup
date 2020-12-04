export default function getImageUrl(assetId, shiny) {
  return `/pokemon/pokemon_icon_${assetId}${shiny ? '_shiny' : ''}.png`
}
