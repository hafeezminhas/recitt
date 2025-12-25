// dialog.service.ts
import { Injectable, Type, inject } from '@angular/core';
import { AlertComponent } from '@coreui/angular';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation';
import { DialogComponent } from '@shared/components/dialog/dialog';
import { AlertType, ConfirmationData, IDialogComponent } from '@shared/types/dialog';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private modalService = inject(NgbModal);

  readonly modalOptions: NgbModalOptions = {
    centered: true,
    backdrop: 'static',
    keyboard: false,
    fullscreen: 'sm',
  };

  open<T extends IDialogComponent<D>, D, R>(
    component: Type<T>,
    inputs: Partial<T> = {},
    options: NgbModalOptions = {}): Observable<R | undefined> {
    const modalRef = this.modalService.open(component, { ...this.modalOptions, ...options });
    modalRef.componentInstance.data = inputs.data;

    return from(modalRef.result).pipe(catchError(() => of(undefined)));
  }

  /** 1. Alert */
  alert(message: string, type: AlertType = AlertType.Info, title = 'Attention'): Observable<boolean> {
    const modalRef = this.modalService.open(AlertComponent, { centered: true });
    modalRef.componentInstance.data = { title, message, type, mode: 'alert', confirmText: 'Dismiss' };
    return from(modalRef.result).pipe(catchError(() => of(false)));
  }

  /** 2. Confirmation */
  confirm(
    data: ConfirmationData
  ): Observable<boolean> {
    return this.open<ConfirmationComponent, ConfirmationData, boolean>(
      ConfirmationComponent,
      { data },
      { centered: false, size: 'md', backdrop: 'static', windowClass: 'confirmation-modal' }
    ).pipe(map(result => !!result));
  }

  /** 3. Agreement */
  agreement(content: string, title = 'Agreement Required'): Observable<boolean> {
    const modalRef = this.modalService.open(DialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = {
      title, message: content, mode: 'agreement',
      confirmText: 'Accept', cancelText: 'Decline', type: 'success'
    };
    return from(modalRef.result).pipe(catchError(() => of(false)));
  }
}
