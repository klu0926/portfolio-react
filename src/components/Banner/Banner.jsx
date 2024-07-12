import style from './Banner.module.scss'
import { useState, useCallback, useEffect, useRef } from 'react'
const banner =
  'https://klu0926-public.s3.ap-southeast-2.amazonaws.com/portfolio/EOD/env/banner.png'

function Banner() {
  // ref
  const containerRef = useRef()
  const imageRef = useRef()

  // change opacity
  const changeOpacity = useCallback(() => {
    const maxBlur = 5

    let rect = containerRef.current.getBoundingClientRect()

    // Calculate the opacity based on the banner's position
    let result = rect.bottom / rect.height
    result = result < 0 ? 0 : result
    result = result > 1 ? 1 : result
    imageRef.current.style.opacity = result
    imageRef.current.style.filter = `
    blur(${(1 - result) * maxBlur}px)
    brightness(${result})
    `
  }, [])

  // add listener
  useEffect(() => {
    window.addEventListener('scroll', changeOpacity)
    return () => {
      window.removeEventListener('scroll', changeOpacity)
    }
  }, [changeOpacity])

  return (
    <>
      <div ref={containerRef} className={style.bannerContainer}>
        <img ref={imageRef} src={banner} className={style.banner} />
        <div className={style.title}>LUSART</div>
      </div>
    </>
  )
}

export default Banner
