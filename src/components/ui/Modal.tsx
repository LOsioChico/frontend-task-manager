import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          {/* Content */}
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>

          {/* Actions */}
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button variant="danger" onClick={onConfirm} className="sm:col-start-2">
              {confirmText}
            </Button>
            <Button variant="secondary" onClick={onClose} className="mt-3 sm:col-start-1 sm:mt-0">
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
