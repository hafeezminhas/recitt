import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class AlertComponent {
  activeModal = inject(NgbActiveModal);
  @Input() data: { title: string; message: string; type: string, okText: string } = { title: 'Alert', message: '', type: 'info', okText: 'Ok' };
}
