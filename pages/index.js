import React, { useState, useEffect, useContext, memo } from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import IVInput from '../components/IVInput'
import Section from '../components/Section'
import Conditional from '../components/Conditional'
import Template from '../components/Template'
import TypeTile from '../components/TypeTile'

import TypeChart from '../sections/TypeChart'
import Moves from '../sections/Moves'
import FastPerCharge from '../sections/FastPerCharge'
import PVPRankings from '../sections/PVPRankings'
import BasicInfo from '../sections/BasicInfo'
import Evolutions from '../sections/Evolutions'
import Damage from '../sections/Damage'

import AppContext from '../utils/AppContext'

import pokedex from '../data/pokedex.json'
import createPokemon from '../utils/createPokemon'
import getImageUrl from '../utils/getImageUrl'
import getDamage from '../utils/getDamage'

const leagueCap = {
  little: 500,
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

function getPokemonFromParam(param = 'Bulbasaur;10;10;10;20') {
  const [
    name = 'Bulbasaur',
    attack = 10,
    defense = 10,
    stamina = 10,
    level = 20,
  ] = param.split(';')

  return {
    name: decodeURIComponent(name),
    attack: parseInt(attack),
    defense: parseInt(defense),
    stamina: parseInt(stamina),
    level: parseInt(level),
  }
}

function createData(pokemon, input, moveType, focusMode, maxLevel) {
  const info = pokemon.getInfo()
  const moves = pokemon.getMoves(moveType)
  const typeMultipliers = pokemon.getTypeMultipliers()
  const stats = pokemon.getStats(input.level)

  if (focusMode) {
    return {
      stats,
      moves,
      typeMultipliers,
      info,
    }
  }

  const pvpRankings = pokemon.getPVPRankings({
    CPCap: leagueCap[input.league],
    maxLevel,
    minIV: info.mythical ? 10 : input.minIV,
  })

  const evolutions = pokemon.getEvolutions()
  const preEvolutions = pokemon.getPreEvolutions()

  return {
    info,
    stats,
    moves,
    pvpRankings,
    evolutions,
    preEvolutions,
    typeMultipliers,
  }
}

function Bookmark({ info, removeBookmark, setPokemon }) {
  const { theme } = useFela()

  return (
    <Box
      alignItems="center"
      direction="row"
      space={1}
      padding={2}
      paddingRight={3}
      paddingLeft={3}
      width={180}
      maxWidth={180}
      onClick={setPokemon}
      extend={{
        cursor: 'pointer',
        borderRadius: theme.roundedCorners,
        backgroundColor: theme.colors.types[info.type1].backgroundColor + '33',
      }}>
      <Box alignItems="flex-start" alignSelf="flex-start">
        <img
          height={40}
          width="auto"
          src={getImageUrl(info.id, info.formType)}
        />
      </Box>
      <Box grow={1} shrink={1}>
        <p
          display={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}>
          {info.name}
        </p>
      </Box>
      <Box
        flex="0 0 10px"
        alignItems="center"
        justifyContent="center"
        onClick={(e) => {
          e.stopPropagation()
          removeBookmark(info.name)
        }}
        extend={{
          cursor: 'pointer',
          top: -10,
          position: 'relative',
          color: theme.colors.types.fighting.backgroundColor,
          padding: 4,
        }}>
        x
      </Box>
    </Box>
  )
}

const PokemonInfo = memo(
  (props) => {
    const { theme } = useFela()
    const {
      addBookmark,
      focusMode,
      ivRankingMode,
      showRawDamage,
      moveType,
      maxLevel,
      pokemon,
      ivs,
      setInput,
      setMaxLevel,
      input,
    } = props
    const {
      info,
      stats,
      moves,
      pvpRankings,
      evolutions,
      preEvolutions,
      typeMultipliers,
    } = createData(pokemon, input, moveType, focusMode, maxLevel)

    return (
      <Box space={focusMode ? 6 : 10}>
        {ivRankingMode ? null : (
          <Box marginTop={focusMode ? -2 : -5}>
            <Section>
              <Layout>
                <BasicInfo
                  ivs={ivs}
                  info={info}
                  stats={stats}
                  pokemon={pokemon}
                  addBookmark={addBookmark}
                />
              </Layout>
            </Section>
          </Box>
        )}
        {focusMode || ivRankingMode ? null : evolutions.length === 0 &&
          preEvolutions.length === 0 ? null : (
          <Section title="Evolution Line">
            <Evolutions
              pokemon={pokemon}
              evolutions={evolutions}
              preEvolutions={preEvolutions}
              level={input.level}
              setName={(name) => setInput({ ...input, name })}
            />
          </Section>
        )}
        {ivRankingMode ? null : (
          <Section title="Type Chart">
            <TypeChart typeMultipliers={typeMultipliers} />
          </Section>
        )}
        {ivRankingMode ? null : (
          <Section title="Moves">
            <Moves moves={moves} thirdMove={info.thirdMove} />
          </Section>
        )}
        {ivRankingMode ? null : (
          <Section title="Fast Move Count" initialExpanded={false}>
            <FastPerCharge moves={moves} />
          </Section>
        )}
        {ivRankingMode ? null : (
          <Section title="Damage">
            <Damage
              pokemon={pokemon}
              stats={stats}
              info={info}
              level={input.level}
              setInput={(values) => setInput({ ...input, ...values })}
            />
          </Section>
        )}
        {focusMode ? null : (
          <Section title="PVP IV Rating">
            <Layout>
              <Box
                paddingTop={1}
                paddingBottom={2}
                direction={['column', 'row']}
                alignItems={['flex-start', , 'center']}
                space={[1, , 1]}>
                <Box alignItems="flex-start" direction="row">
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
                    <option value="little">Little League</option>
                    <option value="great">Great League</option>
                    <option value="ultra">Ultra League</option>
                    <option value="master">Master League</option>
                  </Box>
                </Box>
                {!info.mythical && (
                  <Box
                    alignItems="flex-start"
                    direction="row"
                    paddingTop={[1, , 0]}
                    paddingLeft={[0, , 1]}>
                    <Box
                      value={input.minIV}
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
                        setInput({ ...input, minIV: parseInt(e.target.value) })
                      }>
                      <option value="0">Wild Catch</option>
                      <option value="1">Good Friend</option>
                      <option value="2">Great Friend</option>
                      <option value="3">Ultra Friend</option>
                      <option value="4">Wild Catch (Weather-boost)</option>
                      <option value="5">Best Friend</option>
                      <option value="10">Raid/Egg/Research</option>
                      <option value="12">Lucky Trade</option>
                    </Box>
                  </Box>
                )}
                <Box
                  padding={2}
                  paddingRight={0}
                  paddingBottom={[0, , 2]}
                  space={2}
                  extend={{
                    alignItems: 'baseline',
                  }}>
                  <label htmlFor="level-50" style={{ fontSize: 14 }}>
                    <input
                      type="checkbox"
                      id="level-50"
                      name="level-50"
                      checked={maxLevel === 50 || maxLevel === 51}
                      onChange={(e) =>
                        setMaxLevel(
                          maxLevel === 41
                            ? 51
                            : maxLevel === 40
                            ? 50
                            : maxLevel === 51
                            ? 41
                            : 40
                        )
                      }
                    />{' '}
                    Level 50
                  </label>
                </Box>
                <Box
                  padding={2}
                  paddingRight={2}
                  space={2}
                  extend={{
                    alignItems: 'baseline',
                  }}>
                  <label htmlFor="best-buddy" style={{ fontSize: 14 }}>
                    <input
                      type="checkbox"
                      id="best-buddy"
                      name="best-buddy"
                      checked={maxLevel === 41 || maxLevel === 51}
                      onChange={(e) =>
                        setMaxLevel(
                          maxLevel === 40
                            ? 41
                            : maxLevel === 50
                            ? 51
                            : maxLevel === 41
                            ? 40
                            : 50
                        )
                      }
                    />{' '}
                    Best Buddy
                  </label>
                </Box>

                <a
                  rel="noopener"
                  target="_blank"
                  style={{ color: 'black' }}
                  href={`https://pvpoke.com/rankings/all/${
                    leagueCap[input.league]
                  }/overall/${info.ref}/`}>
                  → Ranking on pvpoke.com
                </a>
              </Box>
            </Layout>
            <PVPRankings
              pvpRankings={pvpRankings}
              ivs={ivs}
              setInput={(values) => setInput({ ...input, ...values })}
            />
          </Section>
        )}
      </Box>
    )
  },
  (prevProps, newProps) =>
    prevProps.input.name === newProps.input.name &&
    prevProps.input.attack === newProps.input.attack &&
    prevProps.input.defense === newProps.input.defense &&
    prevProps.input.stamina === newProps.input.stamina &&
    prevProps.input.level === newProps.input.level &&
    prevProps.input.league === newProps.input.league &&
    prevProps.input.minIV === newProps.input.minIV &&
    prevProps.focusMode === newProps.focusMode &&
    prevProps.ivRankingMode === newProps.ivRankingMode &&
    prevProps.showRawDamage === newProps.showRawDamage &&
    prevProps.moveType === newProps.moveType &&
    prevProps.maxLevel === newProps.maxLevel
)

const initialInput = {
  name: 'Bulbasaur',
  attack: 10,
  defense: 10,
  stamina: 10,
  level: 20,
  league: 'great',
  lucky: false,
  shadow: false,
  purified: false,
}

export default function Page(initialPokemon) {
  const { theme } = useFela()
  const [search, setSearch] = useState('')
  const [moveType, setMoveType] = useState('pvp')
  const [focusMode, setFocusMode] = useState(false)
  const [ivRankingMode, setIvRankingMode] = useState(false)
  const [maxLevel, setMaxLevel] = useState(50)
  const [minIV, setMinIV] = useState(0)
  const [showRawDamage, setShowRawDamage] = useState(false)
  const [bookmarks, setBookmarks] = useState([])
  const [input, setInput] = useState({ ...initialInput, ...initialPokemon })

  const ivs = {
    attack: input.attack,
    defense: input.defense,
    stamina: input.stamina,
  }

  const pokemon = createPokemon(input.name, ivs)
  const searchStr = useDebounce(search, 100)

  useEffect(() => {
    if (window.localStorage.hasOwnProperty('pogo_lookup')) {
      setBookmarks(JSON.parse(window.localStorage.getItem('pogo_lookup')))
    }
  }, [])

  useEffect(() => {
    window.onpopstate = () => {
      // weird browser behaviour dunno what to do
      const param = window.location.search.substr(3)

      setInput({
        ...input,
        ...getPokemonFromParam(decodeURIComponent(param)),
      })
    }

    const param = [
      encodeURIComponent(input.name),
      input.attack,
      input.defense,
      input.stamina,
      input.level,
    ].join(';')

    if (window.location.search.substr(3) !== param) {
      window.history.pushState(
        { p: param },
        '',
        window.location.origin + '/' + '?p=' + param
      )
    }
  }, [input])

  useEffect(() => {
    if (searchStr.trim().length > 1) {
      const exact = pokedex.find(
        (p) => p.name.toLowerCase() === searchStr.toLowerCase()
      )

      const closest = pokedex.find(
        (p) => p.name.toLowerCase().indexOf(searchStr.toLowerCase()) === 0
      )

      if (
        exact ||
        (closest && (input.name !== exact || input.name !== closet))
      ) {
        setInput({ ...input, name: exact ? exact.name : closest.name })
      }
    }
  }, [searchStr])

  useEffect(() => {
    window.localStorage.setItem('pogo_lookup', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = () => {
    if (bookmarks.indexOf(input.name) === -1) {
      setBookmarks((bookmarks) => [...bookmarks, input.name])
    }
  }

  const removeBookmark = (name) => {
    setBookmarks(bookmarks.filter((e) => e !== name))
  }

  return (
    <AppContext.Provider value={{ focusMode, showRawDamage, moveType }}>
      <Head>
        <title>PoGo Lookup | {input.name}</title>
      </Head>
      <Template>
        <Box
          display="none"
          space={2}
          extend={{
            position: 'fixed',
            zIndex: 2,
            top: 152,
            left: 10,

            '@media (min-width: 1280px)': {
              display: 'flex',
            },
          }}>
          {bookmarks.length === 0 ? null : (
            <Box
              as="a"
              paddingLeft={2}
              href=""
              extend={{ color: 'black' }}
              onClick={(e) => {
                e.preventDefault()
                setBookmarks([])
              }}>
              Clear Bookmarks ({bookmarks.length})
            </Box>
          )}
          <Box
            space={2}
            flex="0 0 calc(100vh - 172px)"
            paddingBottom={5}
            extend={{ overflow: 'auto' }}>
            {bookmarks.map((name) => {
              const poke = createPokemon(name, ivs)

              return (
                <Box>
                  <Bookmark
                    info={poke.getInfo()}
                    stats={poke.getStats()}
                    removeBookmark={removeBookmark}
                    setPokemon={() => setInput({ ...input, name })}
                    pokemon={poke}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>
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
          <label htmlFor="focus-mode" style={{ fontSize: 14 }}>
            <input
              type="checkbox"
              id="focus-mode"
              name="focus-mode"
              value={focusMode}
              onChange={(e) => setFocusMode(!focusMode)}
            />{' '}
            Battle Mode
          </label>
          <label htmlFor="iv-ranking-mode" style={{ fontSize: 14 }}>
            <input
              type="checkbox"
              id="iv-ranking-mode"
              name="iv-ranking-mode"
              value={ivRankingMode}
              onChange={(e) => setIvRankingMode(!ivRankingMode)}
            />{' '}
            IV Ranking Mode
          </label>
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
          <label htmlFor="show-raw-damage" style={{ fontSize: 14 }}>
            <input
              type="checkbox"
              id="show-raw-damage"
              name="show-raw-damage"
              value={showRawDamage}
              onChange={(e) => setShowRawDamage(!showRawDamage)}
            />{' '}
            Show Raw Damage
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
                space={2}
                alignItems="stretch">
                <Box grow={2} shrink={0} basis={['auto', , 0]} space={1}>
                  <Box
                    as="input"
                    value={search}
                    paddingTop={1.5}
                    paddingBottom={1.5}
                    paddingRight={3}
                    paddingLeft={3}
                    placeholder="Quick Search, e.g. Cre"
                    extend={{
                      fontSize: 16,
                      borderRadius: theme.roundedCorners,
                      appearance: 'none',
                      border: '1px solid rgb(170, 170, 170)',
                    }}
                    onFocus={(e) => e.target.select()}
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
                        backgroundColor: 'white',
                        backgroundColor:
                          theme.colors.types[pokemon.getInfo().type1]
                            .backgroundColor + '33',
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
                        <option key={poke.name} value={poke.name}>
                          {poke.name}
                        </option>
                      ))}
                    </Box>
                  </Box>
                </Box>
                {focusMode ? null : (
                  <Box
                    grow={3}
                    shrink={0}
                    basis={['auto', , 0]}
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
                        basis={['auto', , 0]}
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
          <PokemonInfo
            addBookmark={addBookmark}
            moveType={moveType}
            focusMode={focusMode}
            ivRankingMode={ivRankingMode}
            showRawDamage={showRawDamage}
            maxLevel={maxLevel}
            ivs={ivs}
            input={input}
            setInput={setInput}
            setMaxLevel={setMaxLevel}
            minIV={minIV}
            setMinIV={setMinIV}
            pokemon={pokemon}
          />
        </Box>
      </Template>
    </AppContext.Provider>
  )
}

Page.getInitialProps = ({ query }) => getPokemonFromParam(query.p)
