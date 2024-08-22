export function utilAwaitTime(timer: number): Promise<void> {
  return new Promise((resolve) => {
    const timers: NodeJS.Timeout = setTimeout(() => {
      clearTimeout(timers)
      resolve()
    }, timer)
  })
}

export function utilCountTime() {
  let startTime = 0
  let time = ''

  const start = () => {
    startTime = performance.now()
  }

  const end = () => {
    const endTime = performance.now()
    const totalMilliseconds = endTime - startTime

    const totalSeconds = Math.floor(totalMilliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    time = minutes ? `${minutes}m ` : ''
    time = `${time}${seconds}s`
  }

  const getTimeCount = () => time

  return {
    start,
    end,
    getTimeCount,
  }
}
