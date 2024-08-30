import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {path:"/",
        element:<Home></Home>
      },
      {path:"/login",
        element:<Login></Login>
      },
      {path:"/registration",
        element:<Registration></Registration>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router} />
  </StrictMode>,
)
