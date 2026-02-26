"use client";

import { toast } from "sonner";
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastOptions = {
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  position?: ToastPosition;
  type?: "default" | "success" | "error" | "warning" | "info";
  icon?: React.ReactNode; // allow custom icon
  dissmiss?: boolean;
};

export function useToast(
  message: string,
  {
    description,
    actionLabel="X",
    onAction,
    dissmiss = true,
    position = "top-right",
    type = "default",
    icon,
  }: ToastOptions = {}
) {

  const baseOptions = {
    description,
    position,
    dissmiss,
    icon,
    action: actionLabel
      ? { label: actionLabel, onClick: onAction ?? (() => { toast.dismiss() }) }
      : undefined,
  };

  switch (type) {
    case "success":
      return toast.success(message, {
        ...baseOptions,
        icon: icon ?? <CheckCircle className="w-5 h-5 text-green-600" />,
      });
    case "error":
      return toast.error(message, {
        ...baseOptions,
        icon: icon ?? <XCircle className="w-5 h-5 text-red-600" />,
      });
    case "warning":
      return toast.warning(message, {
        ...baseOptions,
        icon: icon ?? <AlertCircle className="w-5 h-5 text-yellow-600" />,
      });
    case "info":
      return toast.info(message, {
        ...baseOptions,
        icon: icon ?? <Info className="w-5 h-5 text-blue-600" />,
      });
    default:
      return toast(message, baseOptions);
  }
}