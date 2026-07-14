import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

type Severity = 'error' | 'warning' | 'info' | 'success';

interface NotificationContextType {
  notify: (message: string, severity?: Severity) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Severity>('error');
  const [open, setOpen] = useState(false);

  const notify = useCallback((message: string, severity: Severity = 'error') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={severity} variant="filled" onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
