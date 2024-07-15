import PostsList from '../../components/PostsList/PostsList'

// fetch post to redux
import useFetchPosts from '../../hooks/useFetchPost'

const HomePage = () => {
  useFetchPosts()
  return (
    <>
      <div>
        <PostsList />
      </div>
    </>
  )
}
export default HomePage
