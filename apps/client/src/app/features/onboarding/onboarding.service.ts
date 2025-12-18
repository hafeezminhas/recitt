import { Injectable } from '@angular/core';
import { CreateAccountDto } from '@recitt/types';
import { DataService } from '@shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  private readonly apiPrefix = 'accounts';

  constructor(private dataService: DataService) {}

  addAccount(payload: CreateAccountDto) {
    return this.dataService.postData(this.apiPrefix, payload);
  }
}
