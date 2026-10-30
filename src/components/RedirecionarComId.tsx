import { Navigate, useParams } from 'react-router-dom';

/** Redireciona uma rota antiga com :id para o novo caminho (ex.: /quem-somos/1 → /integrantes/1). */
export default function RedirecionarComId({ para }: { para: string }) {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`${para}/${id ?? ''}`} replace />;
}
