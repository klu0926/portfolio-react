import { Outlet } from 'react-router-dom'
import Footer from '../../common/Footer/Footer'
import MainNavbar from '../../common/MainNavbar/MainNavbar'

// fetch post
import useFetchPosts from '../../hooks/useFetchPost'

function RootLayout() {
  useFetchPosts()
  return (
    <>
      <MainNavbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
