import { useParams } from 'react-router-dom'
import PostDisplay from '../../components/PostDisplay/PostDisplay'

function PostPage() {
  const { postId } = useParams()

  return (
    <>
      <div className="page">
          <PostDisplay postId={postId} />
      </div>
    </>
  )
}

export default PostPage
