import { useState } from 'react'
import './App.css'
import Question1 from './Question1'
import Question2 from './Question2'
import Question3 from './Question3'
import Question4 from './Question4'
import Question5 from './Question5'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Question1 />
   <Question2 />
   <Question3/>
   <Question4/>
   <Question5/>
   </>
  )
}

export default App
