import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertType, ConfirmationData } from '@shared/types/dialog';

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule, IconDirective],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class ConfirmationComponent {
  readonly icons = freeSet;

  activeModal = inject(NgbActiveModal);
  @Input() data: ConfirmationData = {
    type: AlertType.Warning,
    icon: freeSet.cilBellExclamation,
    title: 'Are you sure?',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  };
}
