import React, { useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../../components/Layout'
import Template from '../../components/Template'
import SelectInput from '../../components/SelectInput'
import Checkbox from '../../components/Checkbox'
import Section from '../../components/Section'

const pointMap = {
  battleGym: 1,
  battleRaid: 1,
  battlePvp: 1,
  battleLeader: 1,
  battleRocket: 1,
  play: 1,
  feed: 1,
  pokestop: 1,
  snapshot: 1,
  place: 3,
}

export default function Page() {
  const { theme } = useFela()
  const [input, setInput] = useState({
    battleGym: 9999,
    battleRaid: 9999,
    battlePvp: 30,
    battleLeader: 30,
    battleRocket: 9999,
    play: 30,
    feed: 30,
    pokestop: 30,
    snapshot: 30,
    walk: 1,
    gift: true,
    souvenir: true,
    place: 9999,
  })

  const { gift, souvenir, walk, ...activities } = input

  let points = 0
  let turns = 0
  let steps = []

  if (gift) {
    points += 3
  }

  if (souvenir) {
    points += 3
  }

  if (walk > 0) {
    points += walk * 3
  }

  while (points < 32) {
    for (let activity in activities) {
      if (
        activities[activity] &&
        ((turns + 1) * 30) % activities[activity] === 0
      ) {
        points += pointMap[activity]
      }
    }

    steps.push({ points, turns })

    turns += 1
    // remove a point each 30mins
    if (turns > 0) {
      points -= 1
    }
  }

  const final = steps[steps.length - 1]

  return (
    <Template>
      <Box paddingTop={5} paddingBottom={5} space={5}>
        <Layout>
          <Box space={5}>
            <Box extend={{ fontSize: 18, display: 'inline' }}>
              It takes <strong>{(final.turns * 30) / 60} hours</strong> to get
              your buddy excited at <strong>{final.points} points</strong>.
            </Box>
            <Box space={3} maxWidth={400}>
              <Checkbox
                name="souvenir"
                value={input.souvenir}
                onChange={(souvenir) => setInput({ ...input, souvenir })}>
                Open Souvenir
              </Checkbox>
              <Checkbox
                name="gift"
                value={input.gift}
                onChange={(gift) => setInput({ ...input, gift })}>
                Open Gift
              </Checkbox>

              <SelectInput
                label="Walk with your buddy"
                name="walk"
                value={input.walk}
                onChange={(walk) => setInput({ ...input, walk })}>
                <option value={0}>0 Kilometers</option>
                <option value={1}>2 Kilometers</option>
                <option value={2}>4 Kilometers</option>
                <option value={3}>6 Kilometers</option>
                <option value={4}>8 Kilometers</option>
                <option value={5}>10 Kilometers</option>
                <option value={6}>12 Kilometers</option>
                <option value={7}>14 Kilometers</option>
                <option value={8}>16 Kilometers</option>
                <option value={9}>18 Kilometers</option>
                <option value={10}>20 Kilometers</option>
              </SelectInput>
              <SelectInput
                label="Play with your buddy"
                name="play"
                value={input.play}
                onChange={(play) => setInput({ ...input, play })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>
              <SelectInput
                label="Take a snapshot of your buddy"
                name="snapshot"
                value={input.snapshot}
                onChange={(snapshot) => setInput({ ...input, snapshot })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>
              <SelectInput
                label="Feed your buddy"
                name="snapshot"
                value={input.feed}
                onChange={(feed) => setInput({ ...input, feed })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>
              <SelectInput
                label="Spin a gym or new pokestop"
                name="pokestop"
                value={input.pokestop}
                onChange={(pokestop) => setInput({ ...input, pokestop })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>
              <SelectInput
                label="Visit a recommended place"
                name="place"
                value={input.place}
                onChange={(place) => setInput({ ...input, place })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>
              <SelectInput
                label="Battle in a gym"
                name="place"
                value={input.battleGym}
                onChange={(battleGym) => setInput({ ...input, battleGym })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>
              <SelectInput
                label="Battle in a raid"
                name="place"
                value={input.battleRaid}
                onChange={(battleRaid) => setInput({ ...input, battleRaid })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>

              <SelectInput
                label="Battle another trainer"
                name="place"
                value={input.battlePvp}
                onChange={(battlePvp) => setInput({ ...input, battlePvp })}>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>

              <SelectInput
                label="Battle a team leader"
                name="place"
                value={input.battleLeader}
                onChange={(battleLeader) =>
                  setInput({ ...input, battleLeader })
                }>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>

              <SelectInput
                label="Battle a rocket member"
                name="place"
                value={input.battleRocket}
                onChange={(battleRocket) =>
                  setInput({ ...input, battleRocket })
                }>
                <option value={9999}>never</option>
                <option value={30}>every 30 Minutes</option>
                <option value={60}>every 1 Hour</option>
                <option value={90}>every 1 Hour 30 Minutes</option>
                <option value={90}>every 2 Hours</option>
              </SelectInput>
            </Box>
            <Box paddingTop={4}>
              <Box direction="row" extend={{ fontWeight: 700 }}>
                <Box flex="0 0 50%" maxWidth={200}>
                  Hours
                </Box>
                <Box flex="0 0 50%" maxWidth={200}>
                  Points
                </Box>
              </Box>
              {steps.map(({ points, turns }) => (
                <Box direction="row">
                  <Box flex="0 0 50%" maxWidth={200}>
                    {(turns * 30) / 60}
                  </Box>
                  <Box flex="0 0 50%" maxWidth={200}>
                    {points}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Layout>
      </Box>
    </Template>
  )
}
