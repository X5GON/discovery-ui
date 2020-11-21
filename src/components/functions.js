export function parseISOString(s) {
  var b = s.split(/\D+/)
  return new Date(Date.UTC(b[0], --b[1], b[2]))
  //return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function isoFormatDMY(d) {
  console.log(d)
  return (
    d.getUTCDate() +
    " " +
    months[parseInt(d.getUTCMonth() + 1)] +
    ", " +
    d.getUTCFullYear()
  )
}

console.log(isoFormatDMY(parseISOString("2015-01-01")))
