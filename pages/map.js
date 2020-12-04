import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'kilvin'

import pokealarm from '../data/pokealarm.json'
import pokedex from '../data/pokedex.json'

const formMap = {
  Armored: 'pm0150_00_pgo_a',
  Alolan: 61,
  Galarian: 31,
  Plant: 11,
  Sandy: 12,
  Trash: 13,
  Sunny: 12,
  Rainy: 13,
  Snowy: 14,
  Attack: 12,
  Defense: 13,
  Speed: 14,
  Origin: 12,
  Zen: 12,
  'Galarian Standard': 31,
  'Galarian Zen': 32,
  Incarnate: 11,
  Therian: 12,
  White: 12,
  Black: 13,
  Douse: 12,
  Shock: 13,
  Burn: 14,
  Chill: 15,
  Fan: 15,
  Frost: 14,
  Heat: 12,
  Mow: 16,
  Wash: 13,
  Land: 11,
  Sky: 12,
  Spring: 11,
  Summer: 12,
  Autumn: 13,
  Winter: 14,
  Normal: 11,
  Fighting: 12,
  Flying: 13,
  Poison: 14,
  Ground: 15,
  Rock: 16,
  Bug: 17,
  Ghost: 18,
  Steel: 19,
  Fire: 20,
  Water: 21,
  Grass: 22,
  Electric: 23,
  Psychic: 24,
  Ice: 25,
  Dragon: 26,
  Dark: 27,
  Fairy: 28,
  Ordinary: 11,
  Resolute: 12,
  Aria: 11,
  Pirouette: 12,
  'West Sea': 11,
  'East Sea': 12,
}

export default function Map(props) {
  const router = useRouter()
  const [error, setError] = useState()

  useEffect(() => {
    if (router.query.id) {
      const {
        id,
        form,
        attack = 10,
        defense = 10,
        stamina = 10,
        level = 20,
      } = router.query

      const forms = pokealarm[id] || {}
      const formName = forms[form]
      const formId = formMap[formName] || 0

      const pokemon =
        pokedex.find((poke) => id == poke.id && formId === poke.formId) ||
        // fallback to default
        pokedex.find((poke) => id == poke.id)

      if (!pokemon) {
        setError(id)
        return
      }

      router.replace(
        '/#' +
          encodeURIComponent(pokemon.name) +
          ';' +
          [attack, defense, stamina, level].join(';')
      )
    }
  }, [router.query])

  if (error) {
    return (
      <Box padding={5}>
        Das Pokemon mit der Pokedex-Nummer #{error} konnte nicht gefunden
        werden.
        <br />
        Bitte wende dich an @sprintnudel oder @robinweser.
      </Box>
    )
  }

  return null
}
