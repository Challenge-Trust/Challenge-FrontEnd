import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import QuemSomos from '../pages/QuemSomos';
import QuemSomosDetalhe from '../pages/QuemSomosDetalhe';
import Faq from '../pages/Faq';
import Contato from '../pages/Contato';
import Conversao from '../pages/Conversao';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sobre', element: <Sobre /> },
      { path: 'quem-somos', element: <QuemSomos /> },
      { path: 'quem-somos/:id', element: <QuemSomosDetalhe /> },
      { path: 'faq', element: <Faq /> },
      { path: 'contato', element: <Contato /> },
      { path: 'conversao', element: <Conversao /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
