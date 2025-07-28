
import { useState, useCallback, type JSX } from 'react';
import { Alert, type AlertProps } from '../components/alert/Alert';

type AlertOptions = Omit<AlertProps, 'open' | 'onClose'>;

type UseAlertReturn = {
  alert: (options: AlertOptions) => Promise<void>;
  AlertDialog: () => JSX.Element | null;
};

export const useAlert = (): UseAlertReturn => {
  const [options, setOptions] = useState<AlertOptions | null>(null);
  const [resolve, setResolve] = useState<(() => void) | null>(null);

  const alert = useCallback((opts: AlertOptions): Promise<void> => {
    return new Promise<void>((res) => {
      setOptions(opts);
      setResolve(() => res);
    });
  }, []);

  const handleClose = () => {
    if (resolve) {
      resolve();
    }
    setOptions(null);
  };

  const AlertDialog = useCallback(() => {
    if (!options) {
      return null;
    }
    return (
      <Alert
        open={options !== null}
        onClose={handleClose}
        {...options}
      />
    );
  }, [options]);

  return { alert, AlertDialog };
};
