import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  return (
    <>
      <a href="https://github.com/Renatuscape" target="_blank">
        <h1>Renatuscape</h1>
      </a>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <p>
          Created in Vite + React and Typescript.
        </p>
      </div>
      <p className="read-the-docs">
        This page is under construction
      </p>
    </>
  )
}

export default App
