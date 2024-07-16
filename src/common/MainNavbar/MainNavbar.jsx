import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'

// react
import { useState, useEffect } from 'react'

// style
import './mainNavbar.css'
import style from './mainNavbar.module.scss'

// redux
import { useSelector } from 'react-redux'

function MainNavbar() {
  //const { data: posts, isLoading, error, mutate } = useFetchPosts()
  const posts = useSelector((state) => state.posts.data.data)
  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const [groups, setGroups] = useState({})
  const [links, setLinks] = useState([])

  // (new) groups
  useEffect(() => {
    if (!posts) return

    const newGroups = {}
    posts.forEach((post) => {
      const key = post.group
      if (key) {
        if (newGroups[key]) {
          newGroups[key].push(post)
        } else {
          newGroups[key] = [post]
        }
      }
    })
    setGroups(newGroups)
  }, [posts])

  console.log('groups:', groups)

  // create link with groups
  useEffect(() => {
    const postsLinks = []
    for (const key in groups) {
      postsLinks.push(
        <Dropdown.Item className={style.groupLink} key={key} href={`/group/${key}`}>
          {key}
        </Dropdown.Item>
      )
      groups[key].forEach((post) => {
        postsLinks.push(
          <Dropdown.Item className={style.link} key={post.id} href={`/posts/${post.id}`}>
            {post.title}
          </Dropdown.Item>
        )
      })
    }

    setLinks(postsLinks)
  }, [groups])

  return (
    <>
      <Navbar className={style.navbar} bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            <button className={style.title}>LUSART</button>
          </Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-light"
              className={style.dropdownToggle}
              disabled={!posts}
              style={{ borderWidth: '2.25px', fontWeight: 'bold' }}
            >
              {!posts ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                <>Posts</>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className={style.dropdownMenu}>
              {links}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <div className={style.navbarBackDrop}></div>
    </>
  )
}

export default MainNavbar
