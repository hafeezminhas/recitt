import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const CreateAccountSwagger = {
  ApiOperation: ApiOperation({ summary: 'Onboard new customer.' }),
  ApiResponseSuccess: ApiResponse({
    status: 201,
    description:
      'Customer onboarding completed successfully. Please add billing and other details!',
  }),
  ApiResponseError: ApiResponse({
    status: 400,
    description: 'Validation Error!',
  }),
};

export const AddBillibgInfoSwagger = {
  ApiOperation: ApiOperation({
    summary: 'Add billing information to account.',
  }),
  ApiResponseSuccess: ApiResponse({
    status: 201,
    description: 'Billing information added successfully.',
  }),
  ApiResponseError: ApiResponse({
    status: 400,
    description: 'Validation Error!',
  }),
};
