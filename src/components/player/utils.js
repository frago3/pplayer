const digits = (num) => num < 10 ? `0${num}` : `${num}`
export const timeformat = (s = 0) => {
  const min = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${digits(min)}:${digits(sec)}`
}