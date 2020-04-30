import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from './Layout'

import { version, timestamp } from '../data/version'

export default function Footer() {
  const { theme } = useFela()

  return (
    <Box
      justifyContent="center"
      paddingTop={10}
      paddingBottom={20}
      extend={{
        backgroundColor: theme.colors.text,
        color: 'white',
      }}>
      <Layout>
        <Box space={4} extend={{ fontSize: 14 }}>
          <Box space={2} paddingBottom={2} direction="row">
            <a
              style={{ color: 'white' }}
              href="https://github.com/robinweser/pogolookup">
              Twitter
            </a>

            <a
              style={{ color: 'white' }}
              href="https://github.com/robinweser/pogolookup">
              GitHub
            </a>
          </Box>
          <p>
            Version: {version} ({new Date(timestamp).toLocaleString()})
          </p>
          <p>Copyright &copy; Robin Weser {new Date().getFullYear()}</p>

          <p>
            <br />
            The images are linked from{' '}
            <a
              href="https://images.gameinfo.io/pokemon/"
              style={{ color: 'white' }}>
              https://gameinfo.io
            </a>
            .
            <br />
            Huge thanks to the folks from{' '}
            <a href="https://pvpoke.com" style={{ color: 'white' }}>
              pvpoke.com
            </a>{' '}
            for the inspiration.
            <br />
            Also thanks to all the existing fan sites for providing insights
            such as calculation algorithms and data.
          </p>

          <p>
            Pokémon and Pokémon GO are copyright of The Pokémon Company,
            Niantic, Inc., and Nintendo.
            <br />
            All trademarked images and names are property of their respective
            owners, and any such material is used on this site for educational
            purposes only.
          </p>
        </Box>
      </Layout>
    </Box>
  )
}
