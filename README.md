# homepage

My personal homepage

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/weserio/homepage)

Fetch names

```js
function getNames() {
  const tables = document.querySelectorAll('table.roundy')
  const names = {}

  for (var i = 0; i < tables.length; ++i) {
    const rows = tables[i].querySelectorAll('tr')

    for (var j = 0; j < rows.length; ++j) {
      const tds = rows[j].querySelectorAll('td')

      if (tds.length === 4) {
        const english = tds[2].textContent
        const german = tds[3].textContent

        names[english] = german
      }
    }
  }

  return names
}

console.log(JSON.stringify(getNames(), null, 2))
```
