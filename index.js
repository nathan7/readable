'use strict';
var empty = Buffer(0)

module.exports =
function readable(chunk) {
  var buf = Buffer(chunk)
  read.able = buf.length
  
  function read(n) {
    if (n === -1)
      return read(1)[0]

    var chunk = buf.slice(0, n)
    buf = buf.slice(n)

    read.able = buf.length
    if (!read.able && chunk.length < n)
      throw new Error('premature end of input')

    return chunk
  }

  read.push = push
  function push(chunk) {
    if (!Buffer.isBuffer(chunk))
      chunk = Buffer(chunk)

    if (!chunk.length) return

    buf = (buf && buf.length)
      ? Buffer.concat(buf, chunk)
      : chunk

    read.able = buf.length
  }

  return read
}
