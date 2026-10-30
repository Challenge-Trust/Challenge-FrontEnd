import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import QuemSomos from '../pages/QuemSomos';
import QuemSomosDetalhe from '../pages/QuemSomosDetalhe';
import Faq from '../pages/Faq';
import Contato from '../pages/Contato';
import Conversao from '../pages/Conversao';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import EsqueciSenha from '../pages/EsqueciSenha';
import Painel from '../pages/Painel';
import UsuariosLista from '../pages/UsuariosLista';
import UsuarioDetalhe from '../pages/UsuarioDetalhe';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

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
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Cadastro /> },
      { path: 'esqueci-senha', element: <EsqueciSenha /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'painel', element: <Painel /> },
          { path: 'usuarios', element: <UsuariosLista /> },
          { path: 'usuarios/:id', element: <UsuarioDetalhe /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
