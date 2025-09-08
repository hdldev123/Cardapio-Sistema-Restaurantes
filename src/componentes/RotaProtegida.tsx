import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto';

interface RotaProtegidaProps {
  children: React.ReactNode;
}

export default function RotaProtegida({ children }: RotaProtegidaProps) {
  const { estado } = useAuth();

  if (estado.carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!estado.autenticado) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}