import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import pokealarm from '../data/pokealarm.json'
import pokedex from '../data/pokedex.json'

export default function Map(props) {
  const router = useRouter()

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

      const forms = pokealarm[id]

      const pokemon = pokedex.find((poke) => parseInt(id) === poke.id)
      const formName = forms[form]

      const purePokemon = pokemon.name.split(' (')[0]

      const pokemonWithForm = pokedex.find(
        (poke) => poke.name === purePokemon + ' (' + formName + ')'
      )

      const pokemonName = pokemonWithForm ? pokemonWithForm.name : pokemon.name

      router.replace(
        '/#' +
          encodeURIComponent(pokemonName) +
          ';' +
          [attack, defense, stamina, level].join(';')
      )
    }
  }, [router.query])

  return null
}
