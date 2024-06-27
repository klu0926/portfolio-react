import { Outlet } from 'react-router-dom'
import Footer from '../../common/Footer/Footer'
import MainNavbar from '../../components/MainNavbar/MainNavbar'

// redux
import Fetch from '../../hooks/Fetch' // init data fetching
import { Provider } from 'react-redux'
import store from '../../store/store'

function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <Fetch />

        <MainNavbar />
        <button>click</button>
        <Outlet />
        <Footer />
      </Provider>
    </>
  )
}

export default RootLayout
