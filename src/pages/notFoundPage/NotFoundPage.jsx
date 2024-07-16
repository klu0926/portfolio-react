import React from 'react'
import Container from 'react-bootstrap/Container'
import style from './notFoundPage.module.scss'

// background
import background from '/images/background_3.jpg'

const NotFoundPage = () => {
  return (
    <div className="page">
      <Container className={style.mainContainer}>
  
        <div className={style.textContainer}>
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <a className={style.home} href="/">
            Back To Home
          </a>
        </div>
      </Container>
    </div>
  )
}

export default NotFoundPage
