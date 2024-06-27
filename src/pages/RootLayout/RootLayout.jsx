import { Outlet } from 'react-router-dom'
import Footer from '../../common/Footer/Footer'
import MainNavbar from '../../components/MainNavbar/MainNavbar'

// redux
import { Provider } from 'react-redux'
import store from '../../store/store'

function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <MainNavbar />
        <Outlet />
        <Footer />
      </Provider>
    </>
  )
}

export default RootLayout
