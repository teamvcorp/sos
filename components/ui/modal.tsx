import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null); // Adding type for ref

    useEffect(() => {
        if (isOpen && modalRef.current) {
            const previouslyFocusedElement = document.activeElement as HTMLElement;

            // Focus the modal container
            modalRef.current.focus();

            const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            let focusableElements: NodeListOf<HTMLElement>;

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Tab') {
                    focusableElements = modalRef.current.querySelectorAll(focusableElementsString);
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (event.shiftKey) { 
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            event.preventDefault();
                        }
                    } else { 
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            event.preventDefault();
                        }
                    }
                }
                
                if (event.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                if (previouslyFocusedElement) previouslyFocusedElement.focus();
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            ref={modalRef}
            tabIndex={-1}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div className="p-5 bg-white rounded-lg flex flex-col items-center shadow-lg z-50">
                {children}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
