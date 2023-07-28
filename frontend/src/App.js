import './App.css';
import { createContext, useReducer } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home';
import ErrorPage from './ErrorPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  }
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
