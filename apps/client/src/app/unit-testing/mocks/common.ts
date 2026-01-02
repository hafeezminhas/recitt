import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of } from 'rxjs';

export const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: jest.fn().mockReturnValue('123'),
    },
  },
  queryParamMap: of({
    get: jest.fn().mockReturnValue('456'),
  }),
  params: of({ id: '123' }),
  data: new BehaviorSubject({}),
} as unknown as ActivatedRoute;

export const ngbActiveModalMock = {
  close: jest.fn(),
  dismiss: jest.fn(),
} as unknown as NgbActiveModal;
