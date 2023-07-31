import './App.css';
import { createContext, useReducer } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home';
import ErrorPage from './ErrorPage';
import Cheeses from './routes/Cheeses';
import AddCheese from './routes/AddCheese';
import Login from './routes/Login';
import Register from './routes/Register';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home',
    element: <Cheeses />,
    errorElement: <ErrorPage />
  },
  {
    path: '/addcheese',
    element: <AddCheese />,
    errorElement: <ErrorPage />
  },
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
