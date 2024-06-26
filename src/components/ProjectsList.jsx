import url from '../data/url'
import useFetchPosts from '../helpers/useFetchPost'

const postsUrl = url.server + '/posts'
console.log('postsUrl:', postsUrl)

const ProjectsList = () => {
  const { posts, isLoading, fetchPostError, mutate } = useFetchPosts()

  console.log('fetchPostError:', fetchPostError)
    console.log('isLoading:', isLoading)


  let content = null

  if (isLoading) {
    content = <div>isLoading...</div>
  } else if (fetchPostError) {
    content = (
      <div>
        <p>{fetchPostError.message}</p>
      </div>
    )
  } else {
    content = (
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <div>
                <p>{post.title}</p>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <h1>Projects list</h1>
      {content}
    </>
  )
}

export default ProjectsList
