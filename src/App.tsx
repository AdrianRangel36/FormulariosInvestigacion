import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { FormPage } from './pages/FormPage'
import { forms } from './data/forms'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {forms.map((entry) => (
          <Route key={entry.path} path={entry.path} element={<FormPage form={entry.form} />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
