import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { LocationState } from '../types';

/** Só renderiza as rotas filhas se houver usuário logado; senão redireciona para /login. */
export default function ProtectedRoute() {
  const { autenticado } = useAuth();
  const location = useLocation();

  if (!autenticado) {
    const state: LocationState = {
      from: location.pathname,
      aviso: 'Faça login para acessar esta página.',
    };
    return <Navigate to="/login" replace state={state} />;
  }

  return <Outlet />;
}
