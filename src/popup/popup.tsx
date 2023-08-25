import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'
const App: React.FC<{}> = () => {
  return (
    <div>
      test
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<App />)
