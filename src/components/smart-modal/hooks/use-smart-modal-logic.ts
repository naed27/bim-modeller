import { useState, useCallback, useLayoutEffect, CSSProperties } from "react";

type ModalStatus = {
  text?: string;
  color?: string;
};

export type UseSmartModalLogicProps = {
  subject?: any;
  dontClose?: boolean;
  showModal?: boolean;
  statusText?: string;
  statusColor?: string;
  isStretched?: boolean;
  modalMessage?: string;
  isTransparent?: boolean;
  modalHeaderText?: string;
  noHeaderBorder?: boolean;

  onOpenHandler?: (data: any) => any;
  onCloseHandler?: (data: any) => any;
  onToggleHandler?: (data: any) => any;
  onConfirmHandler?: (data: any) => any;

  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  viewItemButtonLabel?: string;
  viewListButtonLabel?: string;

  cancelButtonClassName?: string;
  confirmButtonClassName?: string;
  viewItemButtonClassName?: string;
  returnToListButtonClassName?: string;

  listUrl?: string;
  itemUrl?: string;

  maxWidth?: string;
  textCenter?: boolean;
  modalStyle?: CSSProperties;
  buttonsStyle?: CSSProperties;
  messageStyle?: CSSProperties;
  modalBodyStyle?: CSSProperties;
  containerStyle?: CSSProperties;

  modalClassName?: string;
  backdropClassName?: string;
  modalBodyClassName?: string;
  modalHeaderClassName?: string;

  awaitConfirmCallback?: boolean;

  hideModal?: boolean;
  hideButtons?: boolean;
  closeButton?: boolean;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
  [key: string]: any;
};

export default function useSmartModalLogic({
  subject: initialArgument,
  statusText: initialStatusText,
  statusColor: initialStatusColor,
  modalMessage: initialModalMessage,
  modalHeaderText: initialModalHeaderText,
  showModal: initialShowModal = false,

  onOpenHandler,
  onCloseHandler,
  onToggleHandler,
  onConfirmHandler,

  cancelButtonLabel: initialCancelButtonLabel = "Cancel",
  confirmButtonLabel: initialConfirmButtonLabel = "Confirm",
  cancelButtonClassName: initialCancelButtonColor = "",
  confirmButtonClassName: initialConfirmButtonColor = "",

  messageStyle = {},
  dontClose = false,
  textCenter = false,
  awaitConfirmCallback = true,

  hideModal = false,
  hideButtons = false,
  closeButton = false,
  hideCancelButton = false,
  hideConfirmButton = false,

  listUrl: initialListUrl,
  itemUrl: initialItemUrl,

  ...props
}: UseSmartModalLogicProps = {}) {
  const [listUrl, setListUrl] = useState<string | undefined>(initialListUrl);
  const [itemUrl, setItemUrl] = useState<string | undefined>(initialItemUrl);

  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState<any>(initialArgument);
  const [showModal, setShowModal] = useState(initialShowModal);
  const [modalMessage, setModalMessage] = useState<string | undefined>(
    initialModalMessage
  );
  const [modalHeaderText, setModalHeaderText] = useState<string | undefined>(
    initialModalHeaderText
  );

  const [cancelButtonLabel, setCancelButtonLabel] = useState(
    initialCancelButtonLabel
  );
  const [cancelButtonClassName, setCancelButtonColor] = useState(
    initialCancelButtonColor
  );
  const [confirmButtonLabel, setConfirmButtonLabel] = useState(
    initialConfirmButtonLabel
  );
  const [confirmButtonClassName, setConfirmButtonColor] = useState(
    initialConfirmButtonColor
  );
  const [modalStatus, setModalStatus] = useState<ModalStatus>({
    text: initialStatusText,
    color: initialStatusColor,
  });

  const [onCloseCallback, setOnCloseCallback] = useState<
    ((data: any) => Promise<void> | void) | null
  >(null);
  const [onConfirmCallback, setOnConfirmCallback] = useState<
    ((data: any) => Promise<void> | void) | null
  >(null);

  const closeModal = useCallback(
    (data?: any) => {
      setShowModal(() => {
        onCloseHandler?.(data);
        return false;
      });

      setSubject(null);
      onToggleHandler?.(data);
    },
    [setSubject, setShowModal, onCloseHandler, onToggleHandler]
  );

  const toggleModalAndBind = useCallback(
    (data: any) => {
      setShowModal((current) => {
        const modalState = !current;
        if (modalState === true) onOpenHandler?.(data);
        if (modalState === false) onCloseHandler?.(data);
        return modalState;
      });

      setSubject(data);
      onToggleHandler?.(data);
    },
    [setSubject, setShowModal, onOpenHandler, onCloseHandler, onToggleHandler]
  );

  const openModal = useCallback(
    async (data?: any) => {
      setShowModal(() => {
        onOpenHandler?.(data);
        return true;
      });
      setSubject(data);
      onToggleHandler?.(data);
    },
    [setSubject, setShowModal, onOpenHandler, onCloseHandler, onToggleHandler]
  );

  const toggleModal = useCallback(
    async (data?: any) => {
      setShowModal((current) => {
        const modalState = !current;
        if (modalState === true) onOpenHandler?.(data);
        if (modalState === false) onCloseHandler?.(data);
        return modalState;
      });

      setSubject(data);
      onToggleHandler?.(data);
    },
    [setSubject, setShowModal, onOpenHandler, onCloseHandler, onToggleHandler]
  );

  const handleCancel = useCallback(async () => {
    try {
      closeModal(null);
      setSubject(initialArgument);
      await onCloseHandler?.(subject);
      await onCloseCallback?.(subject);
    } catch (error) {
      throw error;
    }
  }, [subject, closeModal, onCloseHandler, onCloseCallback, initialArgument]);

  const openConfirmationModal = useCallback(
    ({
      modalMessage: customModalMessage,
      modalHeaderText: customModalHeaderText,
      confirmButtonClassName: customConfirmButtonClassName,
      onConfirmCallback: customOnConfirmCallback,
    }: {
      modalMessage?: string;
      modalHeaderText?: string;
      confirmButtonClassName?: string;
      onConfirmCallback?: (data: any) => Promise<void> | void;
    }) => {
      customModalMessage && setModalMessage(customModalMessage);
      customModalHeaderText && setModalHeaderText(customModalHeaderText);
      customConfirmButtonClassName &&
        setConfirmButtonColor(customConfirmButtonClassName);
      customOnConfirmCallback &&
        setOnConfirmCallback(() => customOnConfirmCallback);
      openModal?.();
    },
    [openModal]
  );

  const handleConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      if (awaitConfirmCallback) {
        await onConfirmHandler?.(subject);
        await onConfirmCallback?.(subject);
        toggleModal();
      } else {
        toggleModal();
        await onConfirmHandler?.(subject);
        await onConfirmCallback?.(subject);
      }
      setSubject(initialArgument);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [
    subject,
    setSubject,
    toggleModal,
    setIsLoading,
    onConfirmHandler,
    onConfirmCallback,
    awaitConfirmCallback,
  ]);

  useLayoutEffect(() => {
    setModalMessage?.(initialModalMessage);
  }, [initialModalMessage]);
  useLayoutEffect(() => {
    setCancelButtonLabel?.(initialCancelButtonLabel);
  }, [initialCancelButtonLabel]);
  useLayoutEffect(() => {
    setCancelButtonColor?.(initialCancelButtonColor);
  }, [initialCancelButtonColor]);
  useLayoutEffect(() => {
    setConfirmButtonLabel?.(initialConfirmButtonLabel);
  }, [initialConfirmButtonLabel]);
  useLayoutEffect(() => {
    setConfirmButtonColor?.(initialConfirmButtonColor);
  }, [initialConfirmButtonColor]);
  useLayoutEffect(() => {
    setModalStatus?.({ text: initialStatusText, color: initialStatusColor });
  }, [initialStatusText, initialStatusColor]);

  return {
    subject,
    isLoading,
    showModal,
    hideModal,
    dontClose,
    textCenter,
    hideButtons,
    closeButton,
    messageStyle,
    closeModal,
    openModal,
    toggleModal,
    toggleModalAndBind,
    setOnCloseCallback,
    modalStatus,
    setModalStatus,
    modalMessage,
    setModalMessage,
    modalHeaderText,
    setModalHeaderText,
    onConfirmCallback,
    setOnConfirmCallback,
    cancelButtonLabel,
    setCancelButtonLabel,
    confirmButtonLabel,
    setConfirmButtonLabel,
    cancelButtonClassName,
    setCancelButtonColor,
    confirmButtonClassName,
    setConfirmButtonColor,
    hideCancelButton,
    hideConfirmButton,

    onCancel: handleCancel as () => Promise<any> | any,
    onConfirm:
      !!onConfirmHandler || !!onConfirmCallback
        ? (handleConfirm as () => Promise<any> | any)
        : undefined,

    listUrl,
    setListUrl,
    itemUrl,
    setItemUrl,

    openConfirmationModal,

    ...props,
  };
}
