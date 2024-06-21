async function fetchItems() {
  const response = await fetch('https://raw.githubusercontent.com/frago3/pplayer/z/files')
  const data = await response.text()

  return data.split('\n')
    .filter(item => item)
    .map(name => ({
      name: name,
      src: `https://firebasestorage.googleapis.com/v0/b/pplayer-cb69c.appspot.com/o/${name}?alt=media`
    }))
}

// function items() {
//   const files = [
//     'strauss.mp3',
//     'holst.mp3',
//     'satie.mp3',
//     'beethoven.mp3',
//     'mozart.mp3'
//   ]
//   return files.map((name) => ({
//       name: name,
//       src: `https://sveltejs.github.io/assets/music/${name}`
//     })
//   )
// }

export default fetchItems
// export default items