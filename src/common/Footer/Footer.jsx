import style from './footer.module.scss'
import Nav from 'react-bootstrap/Nav'

export default function Footer() {
  return (
    <>
      <footer className={style.footer}>
        <p className="text-secondary">lukuoyu@gmail.com © 2024 Kuo Yu Lu</p>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link target='_blank' className={style.link} href="https://github.com/klu0926">
              GitHub
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </footer>
    </>
  )
}
