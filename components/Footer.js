import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import Link from 'next/link'
import { format } from 'small-date'

import Layout from './Layout'

export default function Footer() {
  const { theme } = useFela()

  return (
    <Box
      justifyContent="center"
      paddingTop={10}
      paddingBottom={30}
      extend={{
        backgroundColor: theme.colors.text,
        color: 'white',
      }}>
      <Layout>
        <Box space={4} extend={{ fontSize: 14 }}>
          <Box space={3} paddingBottom={2} direction="row">
            <a style={{ color: 'white' }} href="https://twitter.com/pogolookup">
              Twitter
            </a>

            <a
              style={{ color: 'white' }}
              href="https://github.com/robinweser/pogolookup">
              GitHub
            </a>
            <Link href="/legal">
              <a style={{ color: 'white' }}>Legal</a>
            </Link>
            <Link href="/legal#privacy-policy">
              <a style={{ color: 'white' }}>Privacy</a>
            </Link>
          </Box>
          <p>Last Updated: {format(new Date(), 'MMM dd, yyyy')}</p>
          <p>Copyright &copy; Robin Weser {new Date().getFullYear()}</p>

          <p>
            <br />
            Huge thanks to the folks from{' '}
            <a href="https://pvpoke.com" style={{ color: 'white' }}>
              pvpoke.com
            </a>{' '}
            and all other existing fan site for providing inspiration and
            insights such as calculation algorithms and data.
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
