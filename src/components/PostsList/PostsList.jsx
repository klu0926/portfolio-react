import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

// redux
import { useSelector } from 'react-redux'

// style
import style from './postsList.module.scss'

const PostsList = () => {
  const posts = useSelector((state) => state.posts.data.data)
  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  // posts content
  let content = null

  if (status === 'idle' || status === 'loading') {
    // loading
    content = (
      <Container className="h-100 d-flex justify-content-center">
        <div>
          <Spinner as="span" animation="border" size="sm" />
          <span className="ps-2">LOADING</span>
        </div>
      </Container>
    )
  } else if (status === 'error') {
    // error
    content = <p className="text-center">{error.message}</p>
  } else {
    content = posts.map((post) => {
      // render meta
      let metaArray = []
      if (post.meta && Array.isArray(post.meta)) {
        metaArray = post.meta.map((meta, index) => {
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
      // map return single post
      return (
        <a className={style.postLink} href={`/posts/${post.id}`} key={post.id}>
          <Container className={style.container}>
            <Row>
              <Col sm={12} md={6}>
                <Image className={style.coverImage} src={post.cover} rounded />
              </Col>
              <Col className={style.textCol}>
                <h2 className={style.postTitle}>{post.title}</h2>
                <p>{post.description}</p>
                <div className={style.metaContainer}>{metaArray}</div>
              </Col>
            </Row>
          </Container>
        </a>
      )
    })
  }

  // return all posts content
  return (
    <>
      <Container className={style.mainContainer}>{content}</Container>
    </>
  )
}

export default PostsList
