import './App.css'
import LoginPage from './pages/LoginPage'
import NotesPage from './pages/NotesPage'

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? <NotesPage /> : <LoginPage />}
    </>
  )
}

export default App
