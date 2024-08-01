export function utilAwaitTime(timer: number): Promise<void> {
  return new Promise((resolve) => {
    const timers: NodeJS.Timeout = setTimeout(() => {
      clearTimeout(timers)
      resolve()
    }, timer)
  })
}
