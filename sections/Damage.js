import React, { useState, useEffect } from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import TypeTile from '../components/TypeTile'
import SelectInput from '../components/SelectInput'

import getImageUrl from '../utils/getImageUrl'
import getDamage from '../utils/getDamage'
import createPokemon from '../utils/createPokemon'
import formatDecimal from '../utils/formatDecimal'

import pvpstats from '../data/pvpstats.json'
import pokedex from '../data/pokedex.json'
import pvprankings from '../data/pvprankings.json'

function DamageDisplay({
  attacker,
  attackerLevel,
  attackerStats,
  defenderLevel,
  defenderStats,
  defender,
  health,
  setInput,
  mode,
  removeItem,
}) {
  const { theme } = useFela()
  const moves = attacker.getMoves()
  const info = mode === 'defender' ? attacker.getInfo() : defender.getInfo()

  const { attack, defense, stamina, level, cp } =
    mode === 'attacker' ? defenderStats : attackerStats

  return (
    <Box
      alignItems={['flex-start', , 'center']}
      justifyContent="center"
      direction={['column', , 'row']}
      space={1}
      padding={2}
      paddingRight={4}
      paddingLeft={3}
      onClick={() =>
        setInput({ name: info.name, attack, defense, stamina, level })
      }
      extend={{
        cursor: 'pointer',
        borderRadius: theme.roundedCorners,
        backgroundColor: theme.colors.types[info.type1].backgroundColor + '33',
      }}>
      <Box
        flex="0 0 10px"
        alignItems="center"
        justifyContent="center"
        onClick={(e) => {
          e.stopPropagation()
          removeItem(info.name)
        }}
        extend={{
          cursor: 'pointer',
          top: 0,
          position: 'relative',
          color: theme.colors.types.fighting.backgroundColor,
          padding: 4,
          large: {
            top: -33,
          },
        }}>
        x
      </Box>
      <Box alignItems="center" alignSelf={['flex-start', , 'center']}>
        <img height={40} width="auto" src={getImageUrl(info.id, info.name)} />
      </Box>
      <Box flex="1 1 50%">
        <Box extend={{ fontWeight: 700 }}>{info.name}</Box>
        <Box>
          {cp} CP (Level {level})
        </Box>

        <Box>
          {attack} / {defense} / {stamina}
        </Box>
      </Box>
      <Box space={1} paddingTop={[2, , 0]}>
        {[...moves.chargeMoves, ...moves.eliteChargeMoves].map(
          ({ name, type, id, energy }) => {
            console.log(
              attacker.getStats(attackerLevel),
              defender.getStats(defenderLevel)
            )

            const damage = getDamage(
              attacker,
              attackerLevel,
              defender,
              defenderLevel,
              id
            )

            const percent = Math.min(damage / health, 1) * 100

            return (
              <Box
                direction="row"
                space={2}
                alignItems="center"
                justifyContent={['flex-start', , 'flex-end']}>
                <Box>{name}</Box>
                <TypeTile type={type} />

                <Box
                  justifyContent="flex-end"
                  alignItems="center"
                  direction="row"
                  space={1}
                  grow={[1, , 0]}>
                  <Box width={50} alignItems="flex-end">
                    {formatDecimal(damage / energy)}x
                  </Box>
                  <Box
                    width={100}
                    height={12}
                    extend={{ backgroundColor: 'white', borderRadius: 4 }}>
                    <Box
                      width={100 - percent + '%'}
                      height={12}
                      extend={{
                        backgroundColor:
                          theme.colors.types.dragon.backgroundColor,
                        borderRadius: '4px 0 0 4px',
                      }}
                    />
                    <Box
                      extend={{
                        position: 'relative',
                        width: 98,
                        fontSize: 10,
                        textAlign: 'right',
                        marginTop: -12,
                      }}>
                      {percent >= 100 ? 'K.O' : Math.floor(percent) + '%'}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          }
        )}
      </Box>
    </Box>
  )
}

export default function Damage({
  pokemon,
  stats,
  info,
  level,
  setInput: setGlobalInput,
}) {
  const { theme } = useFela()
  const [pokemonList, setPokemonList] = useState([])
  const [search, setSearch] = useState('')
  const [input, setInput] = useState('Bulbasaur')
  const [mode, setMode] = useState('attacker')
  const [league, setLeague] = useState('great')

  const { hp, cp } = stats

  useEffect(() => {
    if (cp > 2500) {
      setLeague('master')
    } else if (cp > 1500) {
      setLeague('ultra')
    } else {
      setLeague('great')
    }
  }, [cp])

  // useEffect(() => {
  //   setPokemonList(pvprankings[league].slice(0, 20).map((p) => p.speciesName))
  // }, [league])

  useEffect(() => {
    if (search.trim().length > 1) {
      const exact = pokedex.find(
        (p) => p.name.toLowerCase() === search.toLowerCase()
      )

      const closest = pokedex.find(
        (p) => p.name.toLowerCase().indexOf(search.toLowerCase()) === 0
      )

      if (exact || (closest && (input !== exact || input !== closet))) {
        setInput(exact ? exact.name : closest.name)
      }
    }
  }, [search])

  return (
    <Layout>
      <Box space={2} paddingTop={1}>
        <Box>
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault()

              if (pokemonList.indexOf(input) === -1) {
                setPokemonList([input, ...pokemonList])
                setSearch('')
              }
            }}
            direction={['column', , 'row']}
            space={[1, , 2]}>
            <Box alignSelf="flex-start" minWidth={180} paddingBottom={[1, , 0]}>
              <SelectInput value={league} onChange={setLeague}>
                <option value="great" disabled={cp > 1500}>
                  Great League
                </option>
                <option value="ultra" disabled={cp > 2500}>
                  Ultra League
                </option>
                <option value="master">Master League</option>
              </SelectInput>
            </Box>

            <Box
              as="input"
              value={search}
              paddingTop={[1.5, , 1]}
              paddingBottom={[1.5, , 1]}
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
            <SelectInput
              value={input}
              onChange={setInput}
              extend={{
                backgroundColor:
                  input.length > 0
                    ? theme.colors.types[createPokemon(input).getInfo().type1]
                        .backgroundColor + '33'
                    : undefined,
              }}>
              {pokedex.map((poke) => (
                <option value={poke.name}>{poke.name}</option>
              ))}
            </SelectInput>

            <Box
              as="input"
              type="submit"
              paddingTop={[1.5, , 1]}
              paddingBottom={[1.5, , 1]}
              paddingRight={2}
              paddingLeft={2}
              minWidth={100}
              alignItems="center"
              justifyContent="center"
              value="Add"
              extend={{
                appearance: 'none',
                borderRadius: 8,
                fontSize: 16,
                border: 0,
                outline: 0,
                cursor: 'pointer',
                color: 'white',
                backgroundColor: theme.colors.types.dragon.backgroundColor,
              }}
            />
          </Box>
        </Box>
        <Box
          direction="row"
          display={pokemonList.length > 0 ? 'flex' : 'none'}
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
              borderBottomColor: mode === 'attacker' ? 'black' : 'transparent',
              cursor: 'pointer',
              borderBottomWidth: 3,
              borderBottomStyle: 'solid',
            }}
            onClick={(_) => setMode('attacker')}>
            Attacking
          </Box>
          <Box
            padding={2}
            grow={1}
            alignItems="center"
            justifyContent="center"
            extend={{
              borderBottomColor: mode === 'attacker' ? 'transparent' : 'black',
              cursor: 'pointer',
              borderBottomWidth: 3,
              borderBottomStyle: 'solid',
            }}
            onClick={(_) => setMode('defender')}>
            Defending
          </Box>
        </Box>
        <Box space={1}>
          {pokemonList.map((poke) => {
            const attackerStats = pvpstats[poke][league]
            const defenderStats = pvpstats[info.name][league]

            const attacker = createPokemon(poke, {
              attack: attackerStats.attack,
              defense: attackerStats.defense,
              stamina: attackerStats.stamina,
            })

            return (
              <Box space={1}>
                {mode === 'defender' ? (
                  <DamageDisplay
                    removeItem={(name) =>
                      setPokemonList(pokemonList.filter((p) => p !== name))
                    }
                    defender={pokemon}
                    defenderLevel={level}
                    attackerStats={attackerStats}
                    defenderStats={defenderStats}
                    attacker={attacker}
                    attackerLevel={attackerStats.level}
                    setInput={setGlobalInput}
                    health={hp}
                    mode={mode}
                  />
                ) : (
                  <DamageDisplay
                    removeItem={(name) =>
                      setPokemonList(pokemonList.filter((p) => p !== name))
                    }
                    defender={attacker}
                    defenderLevel={attackerStats.level}
                    attackerStats={defenderStats}
                    defenderStats={attackerStats}
                    attacker={pokemon}
                    attackerLevel={level}
                    setInput={setGlobalInput}
                    health={attackerStats.hp}
                    mode={mode}
                  />
                )}
              </Box>
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}
