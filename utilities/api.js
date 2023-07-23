export default async function (query, options) {
  try {
    console.log(query, options)
    return ''
  } catch (error) {
    return new Error(error)
  }
}
