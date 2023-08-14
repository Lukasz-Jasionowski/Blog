import './App.css';
import Home from './Components/Home';
import Layout from './Components/Layout';
import LoginPage from './Components/LoginPage';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
export default App;