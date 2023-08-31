import './App.css';
import Home from './Components/Home';
import Layout from './Components/Layout';
import LoginPage from './Components/LoginPage';
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './Components/RegisterPage';
import { UserContextProvider } from './Components/UserContext';
import CreatePost from './Components/CreatePost';
import PostPage from './Components/PostPage';
import EditPost from './Components/EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
export default App;