import './App.css';
import Home from './Components/Home';
import Layout from './Components/Layout';
import LoginPage from './Components/LoginPage';
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './Components/RegisterPage';
import { UserContextProvider } from './Components/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
export default App;