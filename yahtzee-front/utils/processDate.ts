const getTime = (unixTime: number) => {
  const startTime = new Date(unixTime * 1000)
  const year = startTime.getFullYear()
  const month = startTime.getMonth() + 1
  const day = startTime.getDate()
  let signature = ""
  const getHour = () => {
    const hour = startTime.getHours()
    if (hour > 12) {
      signature = "PM"
      return hour - 12
    }
    signature = "AM"
    return hour
  }
  let min = startTime.getMinutes()
  if (min < 10) {
    min = `0${min}`
  }
  return `${month}/${day}/${year} ${getHour()}:${min} ${signature}`
}

export { getTime }
