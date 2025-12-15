import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '@core/material.module';
import { TablerIconComponent } from 'angular-tabler-icons';
import { BrandingComponent } from './branding.component';

@Component({
  selector: 'app-sidebar',
  imports: [BrandingComponent, MaterialModule, TablerIconComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor() {}
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
}
