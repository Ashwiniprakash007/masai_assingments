import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FocusInput from './Q1/FocusInput'
import RickAndMortyPagination from './Q2/RickAndMortyPagination'
import TodosPagination from './Q3/TodosPagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RickAndMortyPagination/>
    <TodosPagination/>
    <FocusInput/>
    </>
  )
}

export default App
