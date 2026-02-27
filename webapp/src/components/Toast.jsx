import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-4 flex items-center gap-3 min-w-[300px]">
        <div className="flex-shrink-0">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
