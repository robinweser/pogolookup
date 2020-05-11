import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import NextLink from 'next/link'

export default function Link({ href, children }) {
  const { theme } = useFela()

  return (
    <NextLink href={href} passHref>
      <Box as="a" extend={{ color: theme.colors.text }}>
        {children}
      </Box>
    </NextLink>
  )
}
