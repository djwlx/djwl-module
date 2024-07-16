import { useCallback, useState } from 'react';

export type ModalModeType = 'close' | 'open';

export type ModalHookProps<T = any> = {
  mode: ModalModeType;
  visible: boolean;
  data?: T;
  closeModal: () => void;
  setModalData: (mode: ModalModeType, data?: T | undefined) => void;
};

const useModalHook = <T>(): ModalHookProps<T> => {
  const [mode, setMode] = useState<ModalModeType>('close');
  const [data, setData] = useState<T>();

  const closeModal = useCallback(() => {
    setMode('close');
    setData(undefined);
  }, []);

  const setModalData = useCallback((mode: ModalModeType, data?: T) => {
    if (['open'].includes(mode)) {
      data && setData(data);
    }
    setMode(mode);
  }, []);

  return {
    mode,
    visible: mode !== 'close',
    data,
    setModalData,
    closeModal,
  };
};

export default useModalHook;
