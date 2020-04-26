import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, Spacer } from 'kilvin'

import pokedex from '../data/pokedex.json'

import createPokemon from '../utils/createPokemon'
import formatPercent from '../utils/formatPercent'

const leagueCap = {
  great: 1500,
  ultra: 2500,
  master: 9999,
}

const IVInput = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
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
  </select>
)

export default () => {
  const [search, setSearch] = useState('')
  const [input, setInput] = useState({
    name: 'Bulbasaur',
    attack: 10,
    defense: 10,
    stamina: 10,
    level: 20,
    league: 'great',
  })

  useEffect(() => {
    const poke = pokedex.find(
      (p) => p.name.toLowerCase().indexOf(search.toLowerCase()) === 0
    )

    if (poke) {
      setInput({ ...input, name: poke.name })
    }
  }, [search])

  const ivs = {
    attack: input.attack,
    defense: input.defense,
    stamina: input.stamina,
  }

  const pokemon = createPokemon(input.name, ivs)
  const info = pokemon.getPokemon()
  const stats = pokemon.getStats(input.level)

  const pvpRankings = pokemon.getPVPRankings({ CPCap: leagueCap[input.league] })

  function getEvolutionCP(data, evolutions = []) {
    if (data.evolutions) {
      data.evolutions.forEach((name) => {
        const poke = createPokemon(name, ivs)

        evolutions.push(poke.getStats(input.level))
        getEvolutionCP(poke.getPokemon(), evolutions)
      })
    }

    return evolutions
  }

  const evolutions = getEvolutionCP(info)

  const selected = pvpRankings.find(
    (r) =>
      r.attackIV === input.attack &&
      r.defenseIV === input.defense &&
      r.staminaIV === input.stamina
  )

  const rank = 1 + pvpRankings.indexOf(selected)
  const percent = selected.product / pvpRankings[0].product
  const best = pvpRankings[0]

  const tdStyle = {
    backgroundColor: `rgba(0, 255, 0, ${
      (pvpRankings.length - rank) / pvpRankings.length
    })`,
  }

  return (
    <Box
      margin="0 auto"
      padding={3}
      maxWidth={1000}
      width="100%"
      justifyContent="center"
      alignItems="center">
      <Box width="100%" space={10}>
        <Box maxWidth={500} width="100%">
          <Box space={1}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <select
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}>
              {pokedex
                .filter(
                  (p) =>
                    p.name.toLowerCase().indexOf(search.toLowerCase()) === 0
                )
                .map((poke) => (
                  <option value={poke.name}>{poke.name}</option>
                ))}
            </select>
          </Box>
          <Box direction={['column', , 'row']} space={4} paddingTop={4}>
            <Box direction="row" space={4}>
              <Box grow={1}>
                <Box>Attack</Box>
                <IVInput
                  value={input.attack}
                  onChange={(attack) => setInput({ ...input, attack })}
                />
              </Box>
              <Box grow={1}>
                <Box>Defense</Box>
                <IVInput
                  value={input.defense}
                  onChange={(defense) => setInput({ ...input, defense })}
                />
              </Box>
              <Box grow={1}>
                <Box>Stamina</Box>
                <IVInput
                  value={input.stamina}
                  onChange={(stamina) => setInput({ ...input, stamina })}
                />
              </Box>
            </Box>
            <Box grow={1}>
              <Box>Level</Box>
              <select
                value={input.level}
                onChange={(e) =>
                  setInput({ ...input, level: parseInt(e.target.value) })
                }>
                {pokemon._getCpCombinations().map((cp, index) => (
                  <option value={index / 2 + 1}>
                    {index / 2 + 1} ({cp} CP)
                  </option>
                ))}
              </select>
            </Box>
          </Box>
        </Box>

        <Box as="section">
          <h2>Evolutions</h2>
          <Box space={5}>
            {evolutions.map((ev) => (
              <Box>
                <p>{ev.name}</p>
                <p>{ev.cp} CP</p>
              </Box>
            ))}
          </Box>
        </Box>

        <Box as="section" space={2}>
          <h2>PVP Rankings</h2>
          <Box maxWidth={500} width="100%">
            <select
              value={input.league}
              onChange={(e) => setInput({ ...input, league: e.target.value })}>
              <option value="great">Great League</option>
              <option value="ultra">Ultra League</option>
              <option value="master">Master League</option>
            </select>
          </Box>

          <Box extend={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <td>Rank</td>
                  <td>Level</td>
                  <td>Atk</td>
                  <td>Def</td>
                  <td>Sta</td>
                  <td>CP</td>
                  <td>Attack</td>
                  <td>Defense</td>
                  <td>Stamina</td>
                  <td>Prozent</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    backgroundColor: `rgba(255, 0, 0, ${
                      rank / pvpRankings.length
                    })`,
                  }}>
                  <td style={tdStyle}>{rank}</td>
                  <td style={tdStyle}>{selected.level}</td>
                  <td style={tdStyle}>{selected.attackIV}</td>
                  <td style={tdStyle}>{selected.defenseIV}</td>
                  <td style={tdStyle}>{selected.staminaIV}</td>
                  <td style={tdStyle}>{selected.cp}</td>
                  <td style={tdStyle}>
                    {selected.attackStat} (-
                    {Math.floor((best.attackStat - selected.attackStat) * 100) /
                      100}
                    )
                  </td>
                  <td style={tdStyle}>
                    {selected.defenseStat} (-
                    {Math.floor(
                      (best.defenseStat - selected.defenseStat) * 100
                    ) / 100}
                    )
                  </td>
                  <td style={tdStyle}>
                    {selected.staminaStat} (-
                    {Math.floor(
                      (best.staminaStat - selected.staminaStat) * 100
                    ) / 100}
                    )
                  </td>

                  <td style={tdStyle}>{formatPercent(percent)}</td>
                </tr>

                {pvpRankings.slice(0, 100).map((product, i) =>
                  i === rank - 1 ? null : (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{product.level}</td>
                      <td>{product.attackIV}</td>
                      <td>{product.defenseIV}</td>
                      <td>{product.staminaIV}</td>
                      <td>{product.cp}</td>
                      <td>{product.attackStat}</td>
                      <td>{product.defenseStat}</td>
                      <td>{product.staminaStat}</td>

                      <td>
                        {formatPercent(
                          product.product / pvpRankings[0].product
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
