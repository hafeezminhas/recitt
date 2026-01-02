export type MockFacade<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? jest.Mock<ReturnType<T[K]>, Parameters<T[K]>>
    : T[K];
};
