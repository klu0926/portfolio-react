import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import style from './anchor.module.scss'

import { useRef, useState, useEffect, useCallback } from 'react'

function Anchor() {
  const anchorRef = useRef()

  // scroll to top
  const toTop = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  // check scroll position
  const scrollBeforeShow = 100
  const checkScrollTop = useCallback(() => {
    if (window.scrollY > scrollBeforeShow) {
      anchorRef.current.style.opacity = 0.6
    } else {
      anchorRef.current.style.opacity = 0
    }
  }, [])

  // add listener
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)

    return () => {
      window.removeEventListener('scroll', checkScrollTop)
    }
  }, [checkScrollTop])

  return (
    <div ref={anchorRef} className={style.anchor} onClick={toTop}>
      <FontAwesomeIcon className={style.anchorIcon} icon={faCaretUp} />
    </div>
  )
}

export default Anchor
