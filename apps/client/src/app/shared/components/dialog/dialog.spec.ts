import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, ModalModule } from '@coreui/angular';
import { AlertType, DialogMode } from '@shared/types/dialog';
import { NgbActiveModalProvider } from '@unit-testing/index';
import { DialogComponent } from './dialog';

describe('Dialog', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModule, ButtonModule, DialogComponent],
      providers: [NgbActiveModalProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.data = {
      title: 'dummy title',
      message: 'dummy message',
      mode: DialogMode.Agreement,
      confirmText: 'Accept',
      cancelText: 'Decline',
      type: AlertType.Success,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
