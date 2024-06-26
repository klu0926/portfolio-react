import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function useSWRFetcher(url) {
  return useSWR(url, fetcher, {})
}



// How to use:  
// import useSWRFetcher from './useSWRFetcher'
// const { data, error, isLoading, mutate } = useSWRFetcher(url)

// mutate is a function provided by the useSWR hook. It allows you to manually update the SWR cache, either by modifying the data in the cache or by triggering a revalidation of the data

// mutate(key: url) can trigger re-fetch of the url
// mutate() without key use the default url (key) it origin useSWR used
