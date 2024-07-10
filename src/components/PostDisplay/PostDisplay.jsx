import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

// style
import './postDisplay.css'
import style from './postDisplay.module.scss'

// react
import { useEffect, useState, useRef } from 'react'

// redux
import { useSelector } from 'react-redux'

// quill editor
import Quill from '../Quill/Quill'
import Editor from '../Quill/Editor'
const Delta = Quill.import('delta')

// Post Display
function PostDisplay({ postId }) {
  const posts = useSelector((state) => state.posts.data.data)
  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const quillRef = useRef()

  const [currentPost, setCurrentPost] = useState(null)
  const [delta, setDelta] = useState(null)

  useEffect(() => {
    if (posts) {
      const current =
        posts.filter((post) => Number(post.id) === Number(postId))[0] || null
      setCurrentPost(current)
    }
  }, [posts, postId])

  useEffect(() => {
    if (currentPost) {
      setDelta(new Delta(JSON.parse(currentPost.data)))
    }
  }, [currentPost])

  useEffect(() => {
    // quillRef is set in Editor component as quill instance
    if (delta && quillRef.current) {
      quillRef.current.setContents(delta)
    }
  }, [delta])

  let content = null
  // loading
  if (status === 'idle' || status === 'loading') {
    content = (
      <Container className="h-100 d-flex justify-content-center">
        <div>
          <Spinner as="span" animation="border" size="sm" />
          <span className="ps-2">LOADING</span>
        </div>
      </Container>
    )
  }

  // Error
  if (status === 'error') {
    content = <p className="text-center">{error.message}</p>
  }

  // Success
  if (status === 'success' && currentPost) {
    // meta tags
    let metaArray = []
    if (currentPost.meta && Array.isArray(currentPost.meta)) {
      metaArray = currentPost.meta.map((meta, index) => {
        // is link
        if (meta.value.includes('http')) {
          return (
            <p key={index}>
              {meta.key} :{' '}
              <a className="link" target="_blank" href={meta.value}>
                {meta.value}
              </a>
            </p>
          )
        } else {
          return (
            <p key={index}>
              {meta.key} : {meta.value}
            </p>
          )
        }
      })
    }

    content = (
      <>
        <div className="post-title-div">
          <h1 className="post-title">{currentPost.title}</h1>
        </div>
        <div className={style.metaContainer}>{metaArray}</div>

        <Editor ref={quillRef} defaultValue={delta} />
      </>
    )
  }

  return (
    <>
      <div id="post-display">{content}</div>
    </>
  )
}

export default PostDisplay
