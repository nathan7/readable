'use strict';
module.exports =
function readable(buf) {
  if (!Buffer.isBuffer(buf))
    buf = Buffer(buf)

  read.able = buf.length !== 0

  function read(n) {
    if (n === -1)
      return read(1)[0]

    var chunk = buf.slice(0, n)
    buf = buf.slice(n)

    read.able = buf.length !== 0
    if (!read.able && chunk.length < n)
      throw new Error('premature end of input')

    return chunk
  }

  return read
}
