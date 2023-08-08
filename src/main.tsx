import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Index from './routes/Index';
import Project from './routes/Project';
import Root from './routes/Root';
import NotFound from './routes/NotFound';

const routers = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Index />
      },
      {
        path: 'projects/:id',
        element: <Project />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routers} />,
)
