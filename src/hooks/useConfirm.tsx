import { useState, useCallback, type JSX } from 'react';
import { Confirm, type ConfirmProps } from '../components/confirm/Confirm';

type ConfirmOptions = Omit<ConfirmProps, 'open' | 'onClose' | 'onConfirm'>;

type UseConfirmReturn = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  ConfirmationDialog: () => JSX.Element | null;
};

export const useConfirm = (): UseConfirmReturn => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((res) => {
      setOptions(opts);
      setResolve(() => res);
    });
  }, []);

  const handleClose = () => {
    if (resolve) {
      resolve(false);
    }
    setOptions(null);
  };

  const handleConfirm = () => {
    if (resolve) {
      resolve(true);
    }
    setOptions(null);
  };

  const ConfirmationDialog = useCallback(() => {
    if (!options) {
      return null;
    }
    return (
      <Confirm
        open={options !== null}
        onClose={handleClose}
        onConfirm={handleConfirm}
        {...options}
      />
    );
  }, [options]);

  return { confirm, ConfirmationDialog };
};
