import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
// router
import { Route, Routes } from 'react-router-dom'
// page
import RootLayout from './pages/RootLayout/RootLayout'
import HomePage from './pages/homePage/HomePage'
import PostPage from './pages/postPage/PostPage'
import ContactPage from './pages/contactPage/ContactPage'
import NotFoundPage from './pages/notFoundPage/NotFoundPage'
// redux
import { Provider } from 'react-redux'
import { store } from './store/store' // Import only the store

function AppWrapper() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  )
}

export default App
