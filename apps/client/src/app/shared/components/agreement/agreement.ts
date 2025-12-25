import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agreement',
  imports: [CommonModule],
  templateUrl: './agreement.html',
  styleUrl: './agreement.scss',
})
export class Agreement {
  activeModal = inject(NgbActiveModal);
  @Input() title = 'Agreement';
  @Input() content = '';
}
