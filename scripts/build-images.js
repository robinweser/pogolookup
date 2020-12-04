var exec = require('child_process').exec

exec(
  'mkdir pogo_assets && cd pogo_assets && git clone https://github.com/PokeMiners/pogo_assets.git',
  function (error, stdout, stderr) {
    if (error) {
      console.log(error.code)
    }

    console.log(stdout, stderr)
  }
)

// var { Downloader } = require('github-download-directory')
// var { GITHUB_TOKEN } = require('../.env')

// var custom = new Downloader({
//   github: { auth: GITHUB_TOKEN },
// })

// custom
//   .download('PokeMiners', 'pogo_assets', 'Images/Pokemon - 256x256')
//   .then(console.log, console.error)
