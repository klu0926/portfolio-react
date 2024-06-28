import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCaretUp } from '@fortawesome/free-solid-svg-icons'
import style from './anchor.module.scss'

import { useState, useEffect, useCallback } from 'react'

function Anchor() {
  const [isVisible, setIsVisible] = useState(false)

  // scroll to top
  function toTop() {
    window.scrollTo(0, 0)
  }

  // check scroll position
  const checkScrollTop = useCallback(() => {
    if (window.scrollY > 50) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  // add listener
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
  }, [checkScrollTop])

  return (
    <>
      {isVisible && (
        <FontAwesomeIcon
          onClick={toTop}
          className={style.anchor}
          icon={faSquareCaretUp}
        />
      )}
    </>
  )
}

export default Anchor
