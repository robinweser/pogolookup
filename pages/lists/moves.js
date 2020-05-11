import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../../components/Layout'
import Template from '../../components/Template'
import Section from '../../components/Section'
import QuickMove from '../../components/QuickMove'
import ChargeMove from '../../components/ChargeMove'

import AppContext from '../../utils/AppContext'
import getQuickMoveStats from '../../utils/getQuickMoveStats'
import getChargeMoveStats from '../../utils/getChargeMoveStats'

import moves from '../../data/moves.json'

const icon =
  'PHN2ZyBoZWlnaHQ9IjEwMDBweCIgd2lkdGg9Ijg2NnB4IiB2aWV3Qm94PSIwIDAgODY2IDEwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGc+CiAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjcwIiBzdHJva2U9IiNiZWJlYmUiIGZpbGw9IiNiZWJlYmUiIGQ9Ik02MyAyODBjMCAwIDM3MCAzNTYgMzcwIDM1NmMwIDAgMzcyIC0zNTYgMzcyIC0zNTZjMTQuNjY3IC0xNy4zMzMgMzAuNjY3IC0xNy4zMzMgNDggMGMxNy4zMzMgMTQuNjY3IDE3LjMzMyAzMC42NjcgMCA0OGMwIDAgLTM5NiAzOTIgLTM5NiAzOTJjLTE0LjY2NyAxNC42NjcgLTMwLjY2NyAxNC42NjcgLTQ4IDBjMCAwIC0zOTYgLTM5MiAtMzk2IC0zOTJjLTE3LjMzMyAtMTcuMzMzIC0xNy4zMzMgLTMzLjMzMyAwIC00OGMxNiAtMTYgMzIuNjY3IC0xNiA1MCAwYzAgMCAwIDAgMCAwIi8+CiAgPC9nPgo8L3N2Zz4='

export default function Page() {
  const { theme } = useFela()
  const [moveType, setMoveType] = useState('pvp')
  const [moveGroup, setMoveGroup] = useState('quick')
  const [sortBy, setSortBy] = useState('type')

  return (
    <AppContext.Provider value={{ moveType }}>
      <Box
        padding={2}
        space={2}
        extend={{
          position: 'fixed',
          alignItems: 'baseline',
          backgroundColor: 'rgba(200, 200, 200, 0.5)',
          borderRadius: theme.roundedCorners,
          bottom: 12,
          right: 12,
        }}>
        <label htmlFor="move-type" style={{ fontSize: 14 }}>
          <input
            type="checkbox"
            id="move-type"
            name="move-type"
            value={moveType}
            onChange={(e) => setMoveType(moveType === 'pvp' ? 'pve' : 'pvp')}
          />{' '}
          Show PVE Data
        </label>
      </Box>
      <Template>
        <Box paddingTop={3} space={5}>
          <Layout>
            {' '}
            <Box direction="row" space={2} alignItems="center">
              <Box as="label" htmlFor="sort-by">
                Sort By
              </Box>
              <Box alignItems="flex-start">
                <Box
                  value={sortBy}
                  as="select"
                  name="sort-by"
                  id="sort-by"
                  paddingTop={1}
                  paddingBottom={1}
                  paddingRight={3}
                  paddingLeft={3}
                  extend={{
                    fontSize: 18,
                    width: 180,
                    borderRadius: theme.roundedCorners,
                    backgroundColor: 'white',
                    appearance: 'none',
                    border: '1px solid rgb(170, 170, 170)',
                    backgroundSize: '12px 12px',
                    backgroundPosition: 'right 10px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                      'url("data:image/svg+xml;base64,' + icon + '")',
                  }}
                  onChange={(e) => setSortBy(e.target.value)}>
                  <option value="name">Name</option>
                  <option value="type">Type</option>
                  <option value="damage">Damage</option>
                  <option value="energy">Energy</option>
                </Box>
              </Box>
            </Box>
          </Layout>
          <Layout>
            <Box space={2}>
              <Box
                direction="row"
                extend={{
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: theme.colors.border,
                }}>
                <Box
                  padding={2}
                  grow={1}
                  alignItems="center"
                  justifyContent="center"
                  extend={{
                    borderBottomColor:
                      moveGroup === 'quick' ? 'black' : 'transparent',
                    cursor: 'pointer',
                    borderBottomWidth: 3,
                    borderBottomStyle: 'solid',
                  }}
                  onClick={(_) => setMoveGroup('quick')}>
                  Quick Moves
                </Box>
                <Box
                  padding={2}
                  grow={1}
                  alignItems="center"
                  justifyContent="center"
                  extend={{
                    borderBottomColor:
                      moveGroup === 'quick' ? 'transparent' : 'black',
                    cursor: 'pointer',
                    borderBottomWidth: 3,
                    borderBottomStyle: 'solid',
                  }}
                  onClick={(_) => setMoveGroup('charge')}>
                  Charge Moves
                </Box>
              </Box>

              <Box space={2}>
                {Object.keys(moves)
                  .filter((move) =>
                    moveGroup === 'quick'
                      ? move.indexOf('_FAST') !== -1
                      : move.indexOf('_FAST') === -1
                  )
                  .sort((a, b) => {
                    const moveA = {
                      ...moves[a],
                      ...moves[a][moveType],
                    }

                    const moveB = {
                      ...moves[b],
                      ...moves[b][moveType],
                    }

                    if (sortBy === 'type' || sortBy === 'name') {
                      return moveA[sortBy] > moveB[sortBy] ? 1 : -1
                    }

                    return moveB[sortBy] - moveA[sortBy]
                  })
                  .map((move) =>
                    moveGroup === 'quick' ? (
                      <QuickMove {...getQuickMoveStats(move, moveType)} />
                    ) : (
                      <ChargeMove {...getChargeMoveStats(move, moveType)} />
                    )
                  )}
              </Box>
            </Box>
          </Layout>
        </Box>
      </Template>
    </AppContext.Provider>
  )
}
