import { createResource, createSignal } from 'solid-js'
import fetchItems from '../../api/files'
import Playlist from './Playlist'
import Controls from './Controls'

import './styles.css'

function Player() {
  const [data] = createResource(fetchItems)

  const indexState = createSignal(0)
  const playingState = createSignal(false)

  return (
    <div class="player">
      <Playlist tracklist={data} indexState={indexState} playingState={playingState} />
      <Controls tracklist={data} indexState={indexState} playingState={playingState} />
    </div>
  )
}

export default Player

// <Switch>
// <Match when={data()}>
//   <Playlist data={data} indexState={indexState} playingState={playingState} />
//   <Controls data={data} indexState={indexState} playingState={playingState} />
// </Match>
// </Switch>