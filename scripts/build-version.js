const fs = require('fs')
const version = require('../data/version.json')

const [major, minor, patch] = version.version.split('.').map((v) => parseInt(v))

fs.writeFile(
  './data/version.json',
  JSON.stringify(
    {
      version: [major, minor, patch + 1].join('.'),
      timestamp: Date.now(),
    },
    null,
    2
  ),
  (err) => {
    if (err) {
      console.log(`Could not write file: ${err.message}.`)
    }
  }
)
