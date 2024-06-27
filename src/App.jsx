import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
// router
import { Route, Routes } from 'react-router-dom'
// page
import RootLayout from './pages/RootLayout/RootLayout'
import HomePage from './pages/homePage/HomePage'
import ContactPage from './pages/contactPage/ContactPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
