import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import { Home } from './pages/Home/Home'
import { Layout } from './Components/Layout/Layout'
import { Login } from './Components/Login/Login'
import { Register } from './Components/Register/Register'
import { Notfound } from './Components/Notfound/Notfound'
import { Compare } from './Components/Compare/Compare'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import Details from './pages/Details/Details'
// import { Details } from './pages/Details/Details'

const router = createBrowserRouter([
  {path: '' , element: <Layout/>, children: [

    {path:'' , element:<Home/>},
    {path:'/' , element:<Home/>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'compare' , element:<Compare/>},
<<<<<<< HEAD
    {path:'/product/:id' , element:<Details/>},
=======
    {path:'product/:id' , element:<Details/>},
>>>>>>> 9b390f0 (added : Product Details)
    {path:'forgetPassword' , element:<ForgetPassword/>},
    {path:'*' , element:<Notfound/>},
  ]}
])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
