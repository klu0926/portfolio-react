import { Outlet } from 'react-router-dom'
import Footer from '../../common/Footer/Footer'
import MainNavbar from '../../common/MainNavbar/MainNavbar'
import Anchor from '../../common/Anchor/Anchor'

// fetch post
import useFetchPosts from '../../hooks/useFetchPost'

function RootLayout() {
  useFetchPosts()
  return (
    <>
      <Anchor/>
      <MainNavbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
