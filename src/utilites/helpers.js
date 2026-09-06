export async function stringToColor (str) {
  try {
    if (!str) {
      throw new Error('missing string parameter')
    }

    let hash = 0
    str.split('').forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })

    let color = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      color += value.toString(16).padStart(2, '0')
    }
    return color
  } catch (error) {
    console.error(error)
    return false
  }
}
