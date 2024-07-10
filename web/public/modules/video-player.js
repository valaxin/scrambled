
'use strict'

export async function getYTVideoId (url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if ( match && match[7].length == 11 ){
      return match[7]
  } else {
    return false
  }
}
