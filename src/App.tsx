import AuthPage from 'components/AuthPage'
import './style.css'
import { Route, Routes } from 'react-router-dom'
import SearchPage from 'components/SearchPage'
import BreweryDetailPage from 'components/BreweryDetailPage'
import SignUpAndLogIn from 'components/SignUpAndSignIn'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpAndLogIn />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/brewery/:id" element={<BreweryDetailPage />} />
    </Routes>
  )
}
