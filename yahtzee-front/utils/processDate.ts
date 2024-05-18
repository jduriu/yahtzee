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
  const min = startTime.getMinutes()
  return `${month}/${day}/${year} ${getHour()}:${min} ${signature}`
}

export { getTime }
