import useFetchPosts from '../../helpers/useFetchPost'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
// use hook
import useTestFetch from '../../helpers/useTestingFetch'

// style
import style from './postsList.module.scss'

const PostsList = () => {
  const { data: posts, isLoading, error, mutate } = useFetchPosts()
  //const { data: posts, isLoading, error, mutate } = useTestFetch('ok')

  console.log('data:', posts)

  // posts content
  let content = null

  if (isLoading) {
    // loading
    content = (
      <Container className="h-100 d-flex justify-content-center">
        <div>
          <Spinner as="span" animation="border" size="sm" />
          <span className="ps-2">LOADING</span>
        </div>
      </Container>
    )
  } else if (error) {
    // error
    content = <p className="text-center">{error.message}</p>
  } else {
    content = posts.map((post) => (
      <Container className="mb-4" key={post.id}>
        <Row>
          <Col sm={12} md={6}>
            <Image className={style.coverImage} src={post.cover} rounded />
          </Col>
          <Col className="p-2">
            <h2 className="fw-bold">{post.title}</h2>
            <p>{post.description}</p>
            <Button className="button-pink">More</Button>
          </Col>
        </Row>
      </Container>
    ))
  }

  return (
    <>
      <Container className="mt-4">{content}</Container>
    </>
  )
}

export default PostsList
