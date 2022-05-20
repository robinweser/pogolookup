export default function getImageUrl(id, form = '', shiny) {
  return `pokemon/pm${id}.${form ? 'f' + form + '.' : ''}${
    shiny ? 's.' : ''
  }icon.png`
}
