import url from '../data/url'
import useSWRFetcher from './useSWRFetcher'

function useFetchPosts() {
  // actual function starts here
  // URL
  let postUrl = url.server + '/posts'

  // SWR
  const response = useSWRFetcher(postUrl)
  const { data, error, isLoading, mutate } = response

  return {
    data: data?.data,
    isLoading,
    error,
    mutate,
  }
}
export default useFetchPosts
