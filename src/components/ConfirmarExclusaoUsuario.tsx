import type { Usuario } from '../types';
import { mascararCpf } from '../utils/cpf';
import ConfirmDialog from './ConfirmDialog';

interface ConfirmarExclusaoUsuarioProps {
  usuario: Usuario;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function ConfirmarExclusaoUsuario({
  usuario,
  onConfirm,
  onCancel,
}: ConfirmarExclusaoUsuarioProps) {
  return (
    <ConfirmDialog titulo="Excluir usuário?" onConfirm={onConfirm} onCancel={onCancel}>
      <p>
        <strong className="text-heading">{usuario.name}</strong> (CPF {mascararCpf(usuario.cpf)})
        será excluído junto com seus pontos, tickets e viagens. Essa ação não pode ser desfeita.
      </p>
    </ConfirmDialog>
  );
}
