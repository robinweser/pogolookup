/*
TODO:
- Image Remap
- Evolution Item
- Legal / Privacy
- Patreon
- Crypto / Purified / Lucky
- Translations (Names / Moves): German, French, Spanish
- Weather Boosts
*/

import React, { useState, useEffect } from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import IVInput from '../components/IVInput'
import Section from '../components/Section'
import Conditional from '../components/Conditional'
import Template from '../components/Template'

import TypeChart from '../sections/TypeChart'
import Moves from '../sections/Moves'
import PVPRankings from '../sections/PVPRankings'
import BasicInfo from '../sections/BasicInfo'
import Evolutions from '../sections/Evolutions'

import FocusModeContext from '../utils/FocusModeContext'

import pokedex from '../data/pokedex.json'
import createPokemon from '../utils/createPokemon'

const leagueCap = {
  great: 1500,
  ultra: 2500,
  master: 10000,
}

const icon =
  'PHN2ZyBoZWlnaHQ9IjEwMDBweCIgd2lkdGg9Ijg2NnB4IiB2aWV3Qm94PSIwIDAgODY2IDEwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGc+CiAgICA8cGF0aCBzdHJva2Utd2lkdGg9IjcwIiBzdHJva2U9IiNiZWJlYmUiIGZpbGw9IiNiZWJlYmUiIGQ9Ik02MyAyODBjMCAwIDM3MCAzNTYgMzcwIDM1NmMwIDAgMzcyIC0zNTYgMzcyIC0zNTZjMTQuNjY3IC0xNy4zMzMgMzAuNjY3IC0xNy4zMzMgNDggMGMxNy4zMzMgMTQuNjY3IDE3LjMzMyAzMC42NjcgMCA0OGMwIDAgLTM5NiAzOTIgLTM5NiAzOTJjLTE0LjY2NyAxNC42NjcgLTMwLjY2NyAxNC42NjcgLTQ4IDBjMCAwIC0zOTYgLTM5MiAtMzk2IC0zOTJjLTE3LjMzMyAtMTcuMzMzIC0xNy4zMzMgLTMzLjMzMyAwIC00OGMxNiAtMTYgMzIuNjY3IC0xNiA1MCAwYzAgMCAwIDAgMCAwIi8+CiAgPC9nPgo8L3N2Zz4='

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(handler)
  }, [value])

  return debouncedValue
}

export default () => {
  const { theme } = useFela()
  const [search, setSearch] = useState('')
  const [moveType, setMoveType] = useState('pvp')
  const [focusMode, setFocusMode] = useState(false)
  const [input, setInput] = useState({
    name: 'Bulbasaur',
    attack: 10,
    defense: 10,
    stamina: 10,
    level: 20,
    league: 'great',
    lucky: false,
    shadow: false,
    purified: false,
  })

  const searchStr = useDebounce(search, 100)

  useEffect(() => {
    const exact = pokedex.find(
      (p) => p.name.toLowerCase() === searchStr.toLowerCase()
    )

    const closest = pokedex.find(
      (p) => p.name.toLowerCase().indexOf(searchStr.toLowerCase()) === 0
    )

    if (exact || closest) {
      setInput({ ...input, name: exact ? exact.name : closest.name })
    }
  }, [searchStr])

  const ivs = {
    attack: input.attack,
    defense: input.defense,
    stamina: input.stamina,
  }

  // all the pokemon data
  const pokemon = createPokemon(input.name, ivs)
  const info = pokemon.getInfo()
  const stats = pokemon.getStats(input.level)
  const moves = pokemon.getMoves(moveType)
  const pvpRankings = pokemon.getPVPRankings({ CPCap: leagueCap[input.league] })
  const evolutions = pokemon.getEvolutions()
  const typeMultipliers = pokemon.getTypeMultipliers()

  return (
    <FocusModeContext.Provider value={focusMode}>
      <Template>
        <Box
          padding={2}
          extend={{
            position: 'fixed',
            alignItems: 'baseline',
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            borderRadius: theme.roundedCorners,
            bottom: 12,
            right: 12,
          }}>
          <label htmlFor="focus-mode" style={{ fontSize: 14 }}>
            <input
              type="checkbox"
              id="focus-mode"
              name="focus-mode"
              value={focusMode}
              onChange={(e) => setFocusMode(!focusMode)}
            />{' '}
            PVP Focus Mode
          </label>
        </Box>
        <Box space={focusMode ? 6 : 10}>
          <Box
            paddingTop={3}
            paddingBottom={3}
            extend={{
              backgroundColor: 'rgb(220, 220, 220)',
            }}>
            <Layout>
              <Box
                direction={['column', , 'row']}
                space={[2, , 6]}
                alignItems="stretch">
                <Box grow={2} shrink={0} basis={['auto', , 0]} space={1.5}>
                  <Box
                    as="input"
                    value={search}
                    paddingTop={2}
                    paddingBottom={2}
                    paddingRight={3}
                    paddingLeft={3}
                    placeholder="Search..."
                    extend={{
                      fontSize: 18,
                      borderRadius: theme.roundedCorners,
                      appearance: 'none',
                      border: '1px solid rgb(170, 170, 170)',
                    }}
                    onFocus={(e) => e.target.select()}
                    onClick={(e) => e.target.select()}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Box
                    extend={{
                      backgroundColor: 'white',
                      borderRadius: theme.roundedCorners,
                    }}>
                    <Box
                      value={input.name}
                      as="select"
                      paddingTop={1}
                      paddingBottom={1}
                      paddingRight={3}
                      paddingLeft={3}
                      extend={{
                        fontSize: 18,
                        borderRadius: theme.roundedCorners,
                        backgroundColor:
                          theme.colors.types[info.type1].backgroundColor + '33',
                        appearance: 'none',
                        border: '1px solid rgb(170, 170, 170)',
                        backgroundSize: '12px 12px',
                        backgroundPosition: 'right 10px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                          'url("data:image/svg+xml;base64,' + icon + '")',
                      }}
                      onChange={(e) =>
                        setInput({ ...input, name: e.target.value })
                      }>
                      {pokedex.map((poke) => (
                        <option value={poke.name}>{poke.name}</option>
                      ))}
                    </Box>
                  </Box>
                </Box>
                {focusMode ? null : (
                  <Box
                    grow={3}
                    shrink={0}
                    basis={['auto', 0]}
                    direction="row"
                    alignItems="flex-end">
                    <Box
                      grow={1}
                      space={[0.5, 2]}
                      direction={['column', 'row']}>
                      <Box
                        grow={1}
                        shrink={0}
                        basis={['auto', 0]}
                        space={2}
                        direction="row">
                        <Box grow={1} shrink={0} basis={0}>
                          <Box
                            as="label"
                            htmlFor="attack"
                            paddingLeft={1}
                            extend={{ fontSize: 14 }}>
                            Attack
                          </Box>
                          <IVInput
                            name="attack"
                            id="attack"
                            value={input.attack}
                            onChange={(attack) =>
                              setInput({ ...input, attack })
                            }
                          />
                        </Box>
                        <Box grow={1} shrink={0} basis={0}>
                          <Box
                            as="label"
                            htmlFor="defense"
                            paddingLeft={1}
                            extend={{ fontSize: 14 }}>
                            Defense
                          </Box>
                          <IVInput
                            name="defense"
                            id="defense"
                            value={input.defense}
                            onChange={(defense) =>
                              setInput({ ...input, defense })
                            }
                          />
                        </Box>
                        <Box grow={1} shrink={0} basis={0}>
                          <Box
                            as="label"
                            htmlFor="stamina"
                            paddingLeft={1}
                            extend={{ fontSize: 14 }}>
                            Stamina
                          </Box>
                          <IVInput
                            name="stamina"
                            id="stamina"
                            value={input.stamina}
                            onChange={(stamina) =>
                              setInput({ ...input, stamina })
                            }
                          />
                        </Box>
                      </Box>
                      <Box
                        grow={1}
                        shrink={0}
                        basis={['auto', 0]}
                        direction="row">
                        <Box grow={1} shrink={0} basis={0}>
                          <Box
                            as="label"
                            htmlFor="level"
                            paddingLeft={1}
                            extend={{ fontSize: 14 }}>
                            Level
                          </Box>
                          <Box
                            value={input.level}
                            as="select"
                            id="level"
                            name="level"
                            paddingTop={1}
                            paddingBottom={1}
                            paddingRight={3}
                            paddingLeft={3}
                            width="100%"
                            extend={{
                              fontSize: 18,

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
                            onChange={(e) =>
                              setInput({
                                ...input,
                                level: parseFloat(e.target.value),
                              })
                            }>
                            {pokemon._getCpCombinations().map((cp, index) => (
                              <option value={index / 2 + 1}>
                                {index / 2 + 1} ({cp} CP)
                              </option>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Layout>
          </Box>
          {focusMode ? null : (
            <Box marginTop={-5}>
              <Section>
                <BasicInfo info={info} stats={stats} pokemon={pokemon} />
              </Section>
            </Box>
          )}
          {focusMode ? null : evolutions.length === 0 ? null : (
            <Section title="Evolutions">
              <Evolutions
                evolutions={evolutions}
                level={input.level}
                setName={(name) => setInput({ ...input, name })}
              />
            </Section>
          )}
          <Section title="Type Chart">
            <TypeChart typeMultipliers={typeMultipliers} />
          </Section>
          <Section title="Moves">
            <Moves moves={moves} thirdMove={info.thirdMove} />
          </Section>
          {focusMode ? null : (
            <Section title="PVP Rankings">
              <Layout>
                <Box
                  paddingTop={1}
                  paddingBottom={2}
                  direction={['column', 'row']}
                  alignItems={['flex-start', , 'center']}
                  space={[1, , 3]}>
                  <Box alignItems="flex-start">
                    <Box
                      value={input.league}
                      as="select"
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
                      onChange={(e) =>
                        setInput({ ...input, league: e.target.value })
                      }>
                      <option value="great">Great League</option>
                      <option value="ultra">Ultra League</option>
                      <option value="master">Master League</option>
                    </Box>
                  </Box>

                  <a
                    rel="noopener"
                    target="_blank"
                    style={{ color: 'black' }}
                    href={`https://pvpoke.com/rankings/all/${
                      leagueCap[input.league]
                    }/overall/${info.ref}/`}>
                    → Rating on pvpoke.com
                  </a>
                </Box>
              </Layout>
              <PVPRankings pvpRankings={pvpRankings} ivs={ivs} />
            </Section>
          )}
        </Box>
      </Template>
    </FocusModeContext.Provider>
  )
}
