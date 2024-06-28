import url from '../data/url'
import useSWRFetcher from './useSWRFetcher'
import { useDispatch } from 'react-redux'
import { setPosts, setLoading, setError } from '../store/postsSlice'
import { useEffect } from 'react'

function useFetchPosts() {
  // actual function starts here
  // URL
  let postUrl = url.server + '/posts'

  // SWR
  const response = useSWRFetcher(postUrl)
  const { data, error, isLoading, mutate } = response

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading())
    } else if (data) {
      dispatch(setPosts(data))
    } else if (error) {
      dispatch(setError(error.message))
    }
  }, [data, error, dispatch])

  return { mutate }
}
export default useFetchPosts
