
import './App.css'
import Login from './components/Authentication/Login'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Routes>
        <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
