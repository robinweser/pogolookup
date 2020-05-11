import React from 'react'
import { Box } from 'kilvin'

export default function Checkbox({
  name,
  value,
  onChange,
  children,
  ...props
}) {
  return (
    <Box
      as="label"
      htmlFor={name}
      space={2}
      direction="row"
      alignItems="center"
      extend={{ fontSize: 14 }}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        onChange={() => onChange(!value)}
      />
      {children}
    </Box>
  )
}
