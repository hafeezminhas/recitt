import { DataService } from '@shared/services/data.service';
import { MockFacade } from '@unit-testing/types';
import { of } from 'rxjs';

export const dataServiceMock: MockFacade<DataService> = {
  getData: jest.fn().mockImplementation((endpoint: string) => of(null)),
  postData: jest.fn().mockImplementation((endpoint: string, payload: any) => of(null)),
  putData: jest.fn().mockImplementation((endpoint: string, payload: any) => of(null)),
  deleteData: jest.fn().mockImplementation((endpoint: string) => of(null)),
  patchData: jest.fn().mockImplementation((endpoint: string, payload: any) => of(null)),
};
