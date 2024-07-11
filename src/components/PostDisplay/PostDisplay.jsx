import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

// style
import './postDisplay.css'
import style from './postDisplay.module.scss'

// server url
import url from '../../data/url'
const server = url.server

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
  const tags = useSelector((state) => state.tags.data.data)

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
  if (!posts || !tags) {
    content = (
      <Container className="h-100 d-flex justify-content-center mt-4">
          <Spinner as="span" animation="border" size="sm" />
          <span className="ps-2">LOADING</span>
      </Container>
    )
  }

  // Error
  if (status === 'error') {
    content = <p className="text-center">{error.message}</p>
  }

  // Success
  if (currentPost && tags) {
    // meta
    let metaArray = []
    if (currentPost.meta && Array.isArray(currentPost.meta)) {
      metaArray = currentPost.meta.map((meta, index) => {
        // is link
        if (meta.value.includes('http')) {
          return (
            <p key={index}>
              {meta.key} :{' '}
              <a className="link font-1" target="_blank" href={meta.value}>
                {meta.value.split('//')[1]}
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
    // tags
    let tagsArray = []
    if (currentPost.tags && Array.isArray(currentPost.tags)) {
      tagsArray = currentPost.tags.map((postTag) => {
        const currentTag = tags.find(
          (tag) => Number(tag.id) === Number(postTag.id)
        )
        if (!currentTag) return
        return (
          <span key={currentTag.id} className={style.tag}>
            <img src={server + currentTag.icon} alt="tag-icon" />
            {currentTag.name}
          </span>
        )
      })
    }

    content = (
      <>
        <div className="post-title-div">
          <h1 className="post-title">{currentPost.title}</h1>
        </div>
        <div className={style.tagsContainer}>{tagsArray}</div>
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
