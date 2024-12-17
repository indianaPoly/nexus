type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-gray-900 text-gray-300 rounded-lg shadow-2xl w-full max-w-lg p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition duration-300 text-2xl"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
