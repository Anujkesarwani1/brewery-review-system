import AuthPage from 'components/AuthPage'
import './style.css'
import { Route, Routes } from 'react-router-dom'
import SearchPage from 'components/SearchPage'
import BreweryDetailPage from 'components/BreweryDetailPage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/brewery-detail" element={<BreweryDetailPage />} />
    </Routes>
  )
}
