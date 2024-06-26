import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'

// style
import style from './mainNavbar.module.scss'

// hooks
import useFetchPosts from '../../helpers/useFetchPost'
import useTestFetch from '../../helpers/useTestingFetch'

function MainNavbar() {
  //const { data: posts, isLoading, error, mutate } = useFetchPosts()
  const { data: posts, isLoading, error, mutate } = useTestFetch()

  return (
    <>
      <Navbar className={style.navbar} bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            LUSART
          </Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-dark"
              id="dropdown-basic"
              disabled={!posts}
            >
              {!posts ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                'Posts'
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  )
}

export default MainNavbar
