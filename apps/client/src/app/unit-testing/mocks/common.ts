import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of } from 'rxjs';

export const routerMock = {
  navigate: jest.fn().mockResolvedValue(true),
  navigateByUrl: jest.fn().mockResolvedValue(true),
  createUrlTree: jest.fn(),
  serializeUrl: jest.fn(),
  url: '/',
  events: of(),
} as unknown as Router;

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
