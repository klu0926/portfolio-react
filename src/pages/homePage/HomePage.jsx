import PostsList from '../../components/PostsList/PostsList'
import background from '../../images/homePage_background.png'

// style
import style from './homePage.module.scss'

// fetch post to redux
import useFetchPosts from '../../hooks/useFetchPost'

const HomePage = () => {
  const { mutate: refetch } = useFetchPosts()
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
