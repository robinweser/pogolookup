export default function getImageUrl(id, form = '', shiny) {
  console.log(form)

  return `pokemon/pm${id}.${form ? 'f' + form + '.' : ''}${
    shiny ? 's.' : ''
  }icon.png`
}
