import './App.css'
import TestComponent from './components/TestComponent'
import { SocketProvider } from './contexts/SocketContext'

function App() {

  return (
    <SocketProvider>
      <TestComponent></TestComponent>
    </SocketProvider>
  )
}

export default App
