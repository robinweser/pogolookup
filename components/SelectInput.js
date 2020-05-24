import React from 'react'
import { useFela } from 'react-fela'
import { Box } from 'kilvin'

const icon =
  'PHN2ZyBoZWlnaHQ9IjEwMDBweCIgd2lkdGg9Ijg2NnB4IiB2aWV3Qm94PSIwIDAgODY2IDEwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGc+CiAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjcwIiBzdHJva2U9IiNiZWJlYmUiIGZpbGw9IiNiZWJlYmUiIGQ9Ik02MyAyODBjMCAwIDM3MCAzNTYgMzcwIDM1NmMwIDAgMzcyIC0zNTYgMzcyIC0zNTZjMTQuNjY3IC0xNy4zMzMgMzAuNjY3IC0xNy4zMzMgNDggMGMxNy4zMzMgMTQuNjY3IDE3LjMzMyAzMC42NjcgMCA0OGMwIDAgLTM5NiAzOTIgLTM5NiAzOTJjLTE0LjY2NyAxNC42NjcgLTMwLjY2NyAxNC42NjcgLTQ4IDBjMCAwIC0zOTYgLTM5MiAtMzk2IC0zOTJjLTE3LjMzMyAtMTcuMzMzIC0xNy4zMzMgLTMzLjMzMyAwIC00OGMxNiAtMTYgMzIuNjY3IC0xNiA1MCAwYzAgMCAwIDAgMCAwIi8+CiAgPC9nPgo8L3N2Zz4='

export default function SelectInput({
  label,
  value,
  onChange,
  name,
  children,
  extend,
  ...props
}) {
  const { theme } = useFela()

  return (
    <Box grow={1}>
      {!label ? null : (
        <Box
          as="label"
          htmlFor={name}
          paddingLeft={1}
          extend={{ fontSize: 14 }}>
          {label}
        </Box>
      )}
      <Box
        {...props}
        name={name}
        id={name}
        as="select"
        paddingTop={1}
        paddingBottom={1}
        paddingRight={3}
        paddingLeft={3}
        extend={{
          fontSize: 18,
          borderRadius: theme.roundedCorners,
          appearance: 'none',
          border: '1px solid rgb(170, 170, 170)',
          backgroundColor: 'white',
          backgroundSize: '12px 12px',
          backgroundPosition: 'right 10px center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url("data:image/svg+xml;base64,' + icon + '")',
          ...extend,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        {children}
      </Box>
    </Box>
  )
}
