import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

// banner
import Banner from '../Banner/Banner'

// group selector
import GroupSelector from '../GroupSelector/GroupSelector'

// background
import BackgroundImage from './BackgroundImage'

// router
import { useSearchParams } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'

// style
import style from './postsList.module.scss'

// server url
import url from '../../data/url'
const server = url.server

const PostsList = () => {
  const posts = useSelector((state) => state.posts.data.data)
  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const tags = useSelector((state) => state.tags.data.data)

  // search param
  let [searchParams, setSearchParams] = useSearchParams()
  const group = searchParams.get('group')

  // clickHandler
  const postLinkHandler = (event, postId) => {
    if (event.target.nodeName === 'A') {
      return
    }
    window.location.href = `/posts/${postId}`
  }

  // posts content
  let content = null
  // error
  if (status === 'error') {
    content = <p className="text-center">{error.message}</p>
  }

  // loading
  if (status === 'loading') {
    content = (
      <Container
        className="h-100 d-flex justify-content-center"
        style={{ marginTop: '100px' }}
      >
        <div>
          <Spinner as="span" animation="border" size="sm" />
          <span className="ps-2">LOADING</span>
        </div>
      </Container>
    )
  }

  // loaded
  if (posts && tags) {
    content = posts.map((post) => {
      if (group && post.group !== group && group !== 'all') return

      // render meta
      let metaArray = []
      if (post.meta && Array.isArray(post.meta)) {
        metaArray = post.meta.map((meta, index) => {
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
      if (post.tags && Array.isArray(post.tags)) {
        tagsArray = post.tags.map((postTag) => {
          // current tag
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

      // map return single post
      return (
        <Container key={post.id} className={style.container}>
          <Row className="gap-3">
            <Col className={style.coverImageDiv} sm={12} md={6}>
              <Image
                className={style.coverImage}
                src={post.cover}
                rounded
                onClick={(e) => postLinkHandler(e, post.id)}
              />
            </Col>
            <Col className={style.textCol}>
              <h2
                className={style.postTitle}
                onClick={(e) => postLinkHandler(e, post.id)}
              >
                {post.title}
              </h2>
              <p className={style.description}>{post.description}</p>
              <div className={style.tagsContainer}>{tagsArray}</div>
              <div className={style.metaContainer}>{metaArray}</div>
            </Col>
          </Row>
        </Container>
      )
    })
  }

  // return all posts content
  return (
    <>
      <Banner />
      <GroupSelector />
      <Container className={style.mainContainer}>{content}</Container>
      <BackgroundImage />
    </>
  )
}

export default PostsList
