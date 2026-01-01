export interface IAddress {
  building: string;
  street: string;
  town: string;
  county?: string;
  postcode: string;
}

export interface IRequestSuccessRespose {
  message: string;
  status: boolean;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
