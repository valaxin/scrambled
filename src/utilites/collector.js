
export default class Collector {

  constructor () {

  }

  async hydrate (tap, callback) {
    if (!tap) return false
    let response = await fetch (tap)
    let raw = await response.text()
    console.log(raw, response)
  }

}