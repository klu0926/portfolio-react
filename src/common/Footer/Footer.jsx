import Nav from 'react-bootstrap/Nav'
import url from '../../data/url'
// style
import style from './footer.module.scss'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'
import { faServer } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <>
      <footer className={style.footer}>
        <p className="text-secondary">lukuoyu@gmail.com © 2024 Kuo Yu Lu</p>
        <Nav className="justify-content-center">
          <Nav.Item className={style.footerNav}>
            <a
              target="_blank"
              className={style.link}
              href="https://github.com/klu0926"
            >
              <div className={style.linkDiv}>
                <FontAwesomeIcon icon={faGithub} className={style.icon} />{' '}
                GitHub
              </div>
            </a>
            <a
              target="_blank"
              className={style.link}
              href="https://medium.com/@lukuoyu"
            >
              <div className={style.linkDiv}>
                <FontAwesomeIcon icon={faMedium} className={style.icon} />{' '}
                Medium
              </div>
            </a>
            <a target="_blank" className={style.link} href={url.server}>
              <div className={style.linkDiv}>
                <FontAwesomeIcon icon={faServer} className={style.icon} />{' '}
                Server
              </div>
            </a>
          </Nav.Item>
        </Nav>
      </footer>
    </>
  )
}
