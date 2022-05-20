import React, { useContext, useState } from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'
import padLeft from 'pad-left'

import Layout from '../components/Layout'
import TypeTile from '../components/TypeTile'

import AppContext from '../utils/AppContext'
import getImageUrl from '../utils/getImageUrl'

const InfoDisplay = ({ children, name }) => (
  <Box direction="row" alignItems="center">
    <Box grow={0} basis={160}>
      {name}:
    </Box>
    <Box grow={1}>{children}</Box>
  </Box>
)

export default function BaseInfo({ info, stats, pokemon, addBookmark }) {
  const { theme } = useFela()
  const [hover, setHover] = useState(false)
  const { focusMode } = useContext(AppContext)

  const rocket = pokemon.getCPRangeAtLevel(8, 0)
  const encounter = pokemon.getCPRangeAtLevel(15, 10)
  const raidCatch = pokemon.getCPRangeAtLevel(20, 10)
  const raidCatchWeatherBoost = pokemon.getCPRangeAtLevel(25, 10)

  console.log(info)

  const imageUrl = getImageUrl(info.id, info.formType, hover)

  if (focusMode) {
    return (
      <Box alignItems="center" direction="row" space={3}>
        <Box alignItems="flex-start" alignSelf="flex-start">
          <img
            height={70}
            width="auto"
            src={imageUrl}
            onMouseEnter={() => {
              setHover(true)
            }}
            onMouseLeave={() => setHover(false)}
          />
        </Box>
        <Box>
          <h1 style={{ fontSize: 20 }}>{info.name}</h1>
          <Box direction="row" space={1} alignItems="center">
            <TypeTile type={info.type1} />
            {info.type2 ? <TypeTile type={info.type2} /> : null}
          </Box>
        </Box>
      </Box>
    )
  }

  const highestStat = Math.max(info.attack, info.defense, info.stamina)

  return (
    <Box direction={['column', , 'row']} space={4}>
      <Box order={[3, , -1]} grow={1} shrink={0} basis="70%">
        <h1>
          #{info.id} {info.name}
        </h1>
        <Box direction="row" space={1} alignItems="center">
          <TypeTile type={info.type1} />
          {info.type2 ? <TypeTile type={info.type2} /> : null}
        </Box>

        <Spacer size={1} />
        <p style={{ fontSize: 20 }}>
          {stats.cp} CP / {stats.hp} HP
        </p>
        <Spacer size={5} />

        <Box space={1.5}>
          <InfoDisplay name="Candy Distance">
            {info.candyDistance} km
          </InfoDisplay>

          <InfoDisplay name="Rocket CP Range">
            {rocket.min} - {rocket.max}
          </InfoDisplay>
          <InfoDisplay name="Task CP Range">
            {encounter.min} - {encounter.max}
          </InfoDisplay>
          <InfoDisplay name="Raid CP Range">
            {raidCatch.min} - {raidCatch.max}
          </InfoDisplay>
          <InfoDisplay name="  Weather-boost">
            {raidCatchWeatherBoost.min} - {raidCatchWeatherBoost.max}
          </InfoDisplay>

          <Spacer size={2} />
          <InfoDisplay name="Base Attack">
            <Box
              width={(info.attack / highestStat) * 100 + '%'}
              extend={{
                backgroundColor: 'rgb(190, 190 ,190)',
                borderRadius: theme.roundedCorners,
                padding: '2px 6px',
              }}>
              {info.attack}
            </Box>
          </InfoDisplay>
          <InfoDisplay name="Base Defense">
            <Box
              width={(info.defense / highestStat) * 100 + '%'}
              extend={{
                backgroundColor: 'rgb(190, 190 ,190)',
                borderRadius: theme.roundedCorners,
                padding: '2px 6px',
              }}>
              {info.defense}
            </Box>
          </InfoDisplay>
          <InfoDisplay name="Base Stamina">
            <Box
              width={(info.stamina / highestStat) * 100 + '%'}
              extend={{
                backgroundColor: 'rgb(190, 190 ,190)',
                borderRadius: theme.roundedCorners,
                padding: '2px 6px',
              }}>
              {info.stamina}
            </Box>
          </InfoDisplay>
        </Box>
      </Box>
      <Box order={[-1, , 3]}>
        <Box alignItems="flex-start" alignSelf="flex-start">
          <img
            height={150}
            width="auto"
            src={imageUrl}
            onMouseEnter={() => {
              setHover(true)
            }}
            onMouseLeave={() => setHover(false)}
          />
        </Box>
        <Box
          as="a"
          paddingLeft={2}
          href=""
          display="none"
          alignItems="center"
          extend={{
            color: 'black',
            '@media (min-width: 1280px)': {
              display: 'flex',
            },
          }}
          onClick={(e) => {
            e.preventDefault()
            addBookmark()
          }}>
          Bookmark
        </Box>
      </Box>
    </Box>
  )
}
