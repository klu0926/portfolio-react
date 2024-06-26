import PostsList from '../../components/PostsList/PostsList'
import MainNavbar from '../../components/MainNavbar/MainNavbar'
import background from '../../images/homePage_background.png'

// style
import style from './homePage.module.scss'

const backgroundImage = () => {}

const HomePage = () => {
  return (
    <>
      <MainNavbar />
      <div className="page">
        <PostsList />
        <img
          className={style.backgroundImage}
          src={background}
          alt="background"
        />
      </div>
    </>
  )
}

export default HomePage
