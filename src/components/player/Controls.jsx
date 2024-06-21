import { createEffect, createSignal } from 'solid-js'
import Icon from './Icon'

import { timeformat } from './utils'

function Controls({ tracklist, indexState, playingState }) {

  const [index, setIndex] = indexState
  const [isPlaying, setPlaying] = playingState

  const [currentTime, setCurrentTime] = createSignal(0)
  const [duration, setDuration] = createSignal(0)
  const [blockValue, setBlockValue] = createSignal(false)
  const [isCharging, setCharging] = createSignal(true)

  let audio
  createEffect(() => isPlaying() ? audio.play() : audio.pause())

  function next() {
    setIndex(s => (s + 1) % tracklist().length)
    index() == 0 && setPlaying(false)
  }

  function prev() {
    if (currentTime() < 3) {
      index() != 0 && setIndex(s => s - 1)
    } else {
      audio.currentTime = 0
    }
  }

  function loadedMetadata(e) {
    setDuration(e.currentTarget.duration)
    isPlaying() && audio.paused && audio.play()
  }

  return (
    <>
      <table border="0">
        <tbody>
          <tr class="progress">
            <td colspan="3">

              <input type="range"
                onTouchstart={() => setBlockValue(true)}
                onTouchend={() => setBlockValue(false)}
                onMousedown={() => setBlockValue(true)}
                onMouseup={() => setBlockValue(false)}
                value={currentTime()}
                max={duration()}
                onInput={(e) => setCurrentTime(e.currentTarget.valueAsNumber)}
                onChange={(e) => audio.currentTime = e.currentTarget.valueAsNumber} />

            </td>
          </tr>
          <tr class="time">
            <td colspan="3">

                <span>{isCharging() ? "loading..." : timeformat(currentTime())}</span>
                <span>{timeformat(duration())}</span>

            </td>
          </tr>
          <tr class="buttons">
            <td>
              <button onClick={prev}><Icon type="prev" size="34"/></button>

            </td>
            <td>
              <button onClick={() => setPlaying(s => !s)}>
                {isPlaying() ? <Icon type="pause" size="56"/> : <Icon type="play" size="56"/>}
              </button>

            </td>
            <td>
              <button onClick={next}><Icon type="next" size="34"/></button>

            </td>
          </tr>
        </tbody>
      </table>

      <audio
        ref={audio}
        src={tracklist() && tracklist()[index()].src}
        onEnded={next}
        onLoadStart={() => setCharging(true)}
        onWaiting={() => setCharging(true)}
        onCanPlay={() => setCharging(false)}
        onTimeUpdate={(e) => blockValue() || setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={loadedMetadata}
      ></audio>
    </>
  )
}

export default Controls