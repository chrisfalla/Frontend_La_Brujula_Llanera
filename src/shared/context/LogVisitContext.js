import React, { createContext, useState, useContext, useCallback } from 'react';
import { logPlaceVisit } from '../../infrastructure/api/logVisit/logVisitApi';
import { useSelector } from 'react-redux';

const LogVisitContext = createContext(null);

export const LogVisitProvider = ({ children }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [lastVisit, setLastVisit] = useState(null);

  // Obtener usuario desde redux
  const user = useSelector(state => state.auth?.user);
  const userId = user?.id || user?.idUser || null;

  const logVisit = useCallback(async (idPlace) => {
    if (!idPlace || !userId) {
      console.warn('⚠️ No se puede registrar visita: faltan datos');
      return;
    }

    try {
      setStatus('loading');
      const response = await logPlaceVisit({ idPlace, idUserFk: userId });
      if (response && response.success === false) {
        setStatus('failed');
        setError(response.error || 'Error al registrar visita');
        return null;
      }
      setLastVisit(response);
      setStatus('succeeded');
      return response;
    } catch (error) {
      setStatus('failed');
      setError(error.message || 'Error desconocido');
      return null;
    }
  }, [userId]);

  const value = {
    logVisit,
    status,
    error,
    lastVisit
  };

  return (
    <LogVisitContext.Provider value={value}>
      {children}
    </LogVisitContext.Provider>
  );
};

export const useLogVisit = () => {
  const context = useContext(LogVisitContext);
  if (!context) {
    throw new Error('useLogVisit debe ser usado dentro de un LogVisitProvider');
  }
  return context;
};

export default LogVisitContext;
