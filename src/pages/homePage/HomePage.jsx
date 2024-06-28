import PostsList from '../../components/PostsList/PostsList'
import background from '/images/homePage_background.png'

// style
import style from './homePage.module.scss'

// fetch post to redux
import useFetchPosts from '../../hooks/useFetchPost'

const HomePage = () => {
  useFetchPosts()
  return (
    <>
      <div>
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
