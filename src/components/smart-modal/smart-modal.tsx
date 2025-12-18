import { cn } from "@/lib/utils";
import { useEffect } from "react";
import useSmartModalLogic, {
  UseSmartModalLogicProps,
} from "./hooks/use-smart-modal-logic";
import FormButtonSet from "../form-button-set";
import { createPortal } from "react-dom";

export default function SmartModal({
  children,
  modalMessage,
  onCancel,
  onConfirm,
  showModal = false,
  maxWidth = "2000px",
  cancelButtonLabel = "Cancel",
  confirmButtonLabel = "Confirm",
  cancelButtonClassName = "bg-secondary",
  confirmButtonClassName = "bg-primary",

  modalStatus,
  modalHeaderText,
  disabled = false,
  isLoading = false,
  hideModal = false,
  textCenter = false,
  hideButtons = false,
  closeButton = false,
  disableConfirmButton = false,

  modalStyle,
  messageStyle,
  modalBodyStyle,
  containerStyle,
  modalClassName,
  backdropClassName,
  modalBodyClassName,

  additionalButtons,
}: Partial<ReturnType<typeof useSmartModalLogic> & UseSmartModalLogicProps>) {
  const handleModalClose = () => {
    const toastContainer = document.querySelector(".Toastify");
    if ((toastContainer?.children?.length ?? 0) > 0) return;
    onCancel?.();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal && !hideModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal, hideModal]);

  if (!showModal || hideModal) return null;

  return createPortal(
    <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 z-99999 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-200",
          isLoading ? "pointer-events-none" : "pointer-events-auto",
          backdropClassName
        )}
        onClick={handleModalClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          "relative z-50 w-full rounded-lg bg-black border border-gray-500 p-3 shadow-lg transition-all duration-200",
          modalClassName
        )}
        style={{
          ...modalStyle,
          maxWidth: `clamp(0px, 90vw, ${maxWidth})`,
        }}
      >
        {/* Close button */}
        {closeButton && (
          <div className="mb-4 border-b border-gray-500 pb-4">
            <h2 className="font-semibold">{modalHeaderText}</h2>
          </div>
        )}

        {/* Modal Body */}
        <div
          style={modalBodyStyle}
          className={cn(
            modalBodyClassName,
            "h-full overflow-x-auto overflow-y-hidden"
          )}
        >
          <div
            className={cn(
              "d-flex flex-column mt-1 h-full",
              textCenter ? "text-center" : "text-start"
            )}
            style={{
              maxWidth: "unset",
              pointerEvents: isLoading ? "none" : "auto",
              ...containerStyle,
            }}
          >
            {modalMessage && (
              <p
                style={{
                  width: "fit-content",
                  ...messageStyle,
                }}
              >
                {modalMessage}
              </p>
            )}

            {modalStatus?.text && (
              <span
                style={{ width: "fit-content" }}
                className={`btn-bg-${modalStatus?.color}`}
              >
                {modalStatus.text}
              </span>
            )}

            {children}
          </div>
        </div>

        {/* Buttons */}
        {!hideButtons && (
          <div className="mt-4 flex justify-end">
            <FormButtonSet
              hide={hideButtons}
              disabled={disabled}
              isLoading={isLoading}
              onCancel={onCancel}
              onConfirm={onConfirm}
              cancelButtonLabel={cancelButtonLabel}
              confirmButtonLabel={confirmButtonLabel}
              disableConfirmButton={disableConfirmButton}
              cancelButtonClassName={cancelButtonClassName}
              confirmButtonClassName={confirmButtonClassName}
              style={{
                paddingInline: "0px",
                marginTop: "5px",
              }}
            >
              {additionalButtons}
            </FormButtonSet>
          </div>
        )}

        {/* Close icon (X) */}
        {closeButton && (
          <button
          aria-label="Close"
          onClick={handleModalClose}
          className="absolute right-4 top-4 text-gray-50"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  ,document.body);
}
