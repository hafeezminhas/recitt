import { freeSet } from "@coreui/icons";

// dialog.models.ts
export enum AlertType {
  Primary = 'primary',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
  Success = 'success'
};

export enum DialogMode {
  Alert = 'alert',
  Confirm = 'confirm',
  Agreement = 'agreement'
}

export interface DialogData {
  title: string;
  message?: string;
  type?: AlertType;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
  mode: DialogMode;
}

export interface ConfirmationData {
  icon?: string | typeof freeSet.cilBellExclamation;
  type: AlertType;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

export interface AgreementData {
  title: string;
  content: string;
}

/** * A helper interface to ensure components passed to the service
 * have a 'data' input property.
 */
export interface IDialogComponent<TData> {
  data: TData;
}
