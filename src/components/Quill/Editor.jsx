import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
import Quill from './Quill'

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({  defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null)
    const defaultValueRef = useRef(defaultValue)
    const onTextChangeRef = useRef(onTextChange)
    const onSelectionChangeRef = useRef(onSelectionChange)

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange
      onSelectionChangeRef.current = onSelectionChange
    })



    useEffect(() => {
      const container = containerRef.current
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      )
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        readOnly: true,
        modules: {
          toolbar: false, // Disable the toolbar
        },
      })

      // set current quill as useRef instance
      ref.current = quill

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current)
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args)
      })

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args)
      })

      return () => {
        ref.current = null
        container.innerHTML = ''
      }
    }, [ref])

    return <div ref={containerRef}></div>
  }
)

Editor.displayName = 'Editor'

export default Editor
