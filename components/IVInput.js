import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

const icon =
  'PHN2ZyBoZWlnaHQ9IjEwMDBweCIgd2lkdGg9Ijg2NnB4IiB2aWV3Qm94PSIwIDAgODY2IDEwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGc+CiAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjcwIiBzdHJva2U9IiNiZWJlYmUiIGZpbGw9IiNiZWJlYmUiIGQ9Ik02MyAyODBjMCAwIDM3MCAzNTYgMzcwIDM1NmMwIDAgMzcyIC0zNTYgMzcyIC0zNTZjMTQuNjY3IC0xNy4zMzMgMzAuNjY3IC0xNy4zMzMgNDggMGMxNy4zMzMgMTQuNjY3IDE3LjMzMyAzMC42NjcgMCA0OGMwIDAgLTM5NiAzOTIgLTM5NiAzOTJjLTE0LjY2NyAxNC42NjcgLTMwLjY2NyAxNC42NjcgLTQ4IDBjMCAwIC0zOTYgLTM5MiAtMzk2IC0zOTJjLTE3LjMzMyAtMTcuMzMzIC0xNy4zMzMgLTMzLjMzMyAwIC00OGMxNiAtMTYgMzIuNjY3IC0xNiA1MCAwYzAgMCAwIDAgMCAwIi8+CiAgPC9nPgo8L3N2Zz4='

export default function IVInput({ value, onChange, ...props }) {
  const { theme } = useFela()

  return (
    <Box
      {...props}
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
      }}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}>
      <option value={0}>0</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
      <option value={11}>11</option>
      <option value={12}>12</option>
      <option value={13}>13</option>
      <option value={14}>14</option>
      <option value={15}>15</option>
    </Box>
  )
}
