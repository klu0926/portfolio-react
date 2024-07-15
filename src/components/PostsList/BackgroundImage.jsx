import background from '/images/homePage_background.png'
import style from './background.module.scss'

import { useState, useRef, useEffect, useCallback } from 'react'

const BackgroundImage = () => {
  const defaultOffSetY = 380
  const [offSetY, setOffSetY] = useState(defaultOffSetY)
  const backgroundRef = useRef()

  // scroll handler
  const scrollHandler = useCallback(() => {
    if (window.scrollY >= offSetY) {
      backgroundRef.current.style.opacity = '1'
    } else {
      backgroundRef.current.style.opacity = '0'
    }
  }, [offSetY])

  // browser resize handler
  const resizeHandler = useCallback(() => {
    // disable scrollHandler, and set background to op 1
    if (window.innerWidth < 1200) {
      setOffSetY(0)
      scrollHandler()
    } else {
      setOffSetY(defaultOffSetY)
      scrollHandler()
    }
  }, [scrollHandler])

  // add scroll listener
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [scrollHandler])

  // add window resize listener
  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [resizeHandler])

  return (
    <img
      ref={backgroundRef}
      className={style.backgroundImage}
      src={background}
      alt="background"
    />
  )
}

export default BackgroundImage
