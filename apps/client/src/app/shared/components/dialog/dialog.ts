import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonModule, ModalModule } from '@coreui/angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogData } from '@shared/types/dialog';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, ModalModule, ButtonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class DialogComponent {
  activeModal = inject(NgbActiveModal);
  @Input() data!: DialogData;
}
