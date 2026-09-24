import { useEffect, useRef, useState, useCallback } from 'react'

// Drives play/pause/next/prev/restart over an array of visualization steps.
// speed: 1 (slow) .. 5 (fast)
export function useStepPlayer(steps) {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(3)
  const timerRef = useRef(null)

  const total = steps.length
  const atEnd = index >= total - 1

  useEffect(() => {
    setIndex(0)
    setIsPlaying(false)
  }, [steps])

  useEffect(() => {
    if (!isPlaying) return undefined
    if (atEnd) {
      setIsPlaying(false)
      return undefined
    }
    const delay = 1000 - speed * 160 // speed 1 -> 840ms, speed 5 -> 200ms
    timerRef.current = setTimeout(() => {
      setIndex((i) => Math.min(i + 1, total - 1))
    }, Math.max(120, delay))
    return () => clearTimeout(timerRef.current)
  }, [isPlaying, index, speed, atEnd, total])

  const play = useCallback(() => {
    if (atEnd) setIndex(0)
    setIsPlaying(true)
  }, [atEnd])
  const pause = useCallback(() => setIsPlaying(false), [])
  const next = useCallback(() => {
    setIsPlaying(false)
    setIndex((i) => Math.min(i + 1, total - 1))
  }, [total])
  const prev = useCallback(() => {
    setIsPlaying(false)
    setIndex((i) => Math.max(i - 1, 0))
  }, [])
  const restart = useCallback(() => {
    setIsPlaying(false)
    setIndex(0)
  }, [])
  const seek = useCallback(
    (i) => {
      setIsPlaying(false)
      setIndex(Math.max(0, Math.min(i, total - 1)))
    },
    [total],
  )

  return {
    index,
    total,
    step: steps[index],
    isPlaying,
    atEnd,
    speed,
    setSpeed,
    play,
    pause,
    next,
    prev,
    restart,
    seek,
  }
}
