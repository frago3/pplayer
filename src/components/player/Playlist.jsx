
function Playlist({ tracklist, indexState, playingState }) {

  const [index, setIndex] = indexState
  const [isPlaying, setPlaying] = playingState

  function select(id) {
    if (index() == id) {
      setPlaying(s => !s)
    } else {
      setIndex(id)
      isPlaying() || setPlaying(true)
    }
  }

  return (
    <ul>
      {tracklist() && tracklist().map((track, id) => (
        
        <li class={index() == id && "selected"}>
            <button onClick={() => select(id)}>
              {track.name}
            </button>
        </li>
      
      ))}
    </ul>
  )
}

export default Playlist