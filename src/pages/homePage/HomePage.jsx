import PostsList from '../../components/PostsList/PostsList'
import background from '../../images/homePage_background.png'

// style
import style from './homePage.module.scss'

const backgroundImage = () => {}

const HomePage = () => {
  return (
    <>
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
