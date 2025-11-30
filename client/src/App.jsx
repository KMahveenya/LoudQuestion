import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import GamePage from './pages/GamePage/GamePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </Router>
  )
}

export default App
