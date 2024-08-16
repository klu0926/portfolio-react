// source:
// https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone

// <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

// set maximum-scale in meta viewport will prevent iOS to zoom in when using input
// however this prevent androids devices zooming ability
// adding maximum-scale to meta viewport only when device is iOS

import { useEffect } from 'react'

// Custom hook to handle viewport scaling on iOS
const useDisableIosTextFieldZoom = () => {
  useEffect(() => {
    const addMaximumScaleToMetaViewport = () => {
      const el = document.querySelector('meta[name=viewport]')
      if (el !== null) {
        let content = el.getAttribute('content')
        let re = /maximum\-scale=[0-9\.]+/g

        if (re.test(content)) {
          content = content.replace(re, 'maximum-scale=1.0')
        } else {
          content = [content, 'maximum-scale=1.0'].join(', ')
        }

        el.setAttribute('content', content)
      }
    }

    const checkIsIOS = () =>
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

    if (checkIsIOS()) {
      addMaximumScaleToMetaViewport()
    }
  }, [])
}

export default useDisableIosTextFieldZoom
