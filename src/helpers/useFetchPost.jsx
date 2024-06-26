import url from '../data/url'
import useSWRFetcher from './useSWRFetcher'

function useFetchPosts() {
  // URL
  let postUrl = url.server + '/posts'

  // SWR
  const response = useSWRFetcher(postUrl)
  const { data, error, isLoading, mutate } = response

  return {
    posts: data?.data,
    isLoading,
    fetchPostError: error,
    mutate,
  }
}
export default useFetchPosts
