import { Toast, ToastMessage } from "primereact/toast";
import { createContext, useContext, useRef, useState } from "react";

interface ToastState {
    setPosition: (position: 'center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right') => void;
    showMessage: (toastMessage: ToastMessage) => void;
}

const ToastContext = createContext<ToastState | null>(null);

export const ToastProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const toastRef = useRef<Toast>(null);

    const [ position, setPosition ] = useState<'center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'>("top-center");

    const showMessage = (toastMessage: ToastMessage) => {
        toastRef.current?.show(toastMessage)
    }

    const state: ToastState = {
        setPosition,
        showMessage
    }

    return (
        <ToastContext.Provider value={state}>
            <Toast ref={toastRef} position={position} />
            { children }
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastState => {
    const context = useContext(ToastContext);

    if (!context) throw new Error("useToast must be used with ToastProvider");

    return context;
}