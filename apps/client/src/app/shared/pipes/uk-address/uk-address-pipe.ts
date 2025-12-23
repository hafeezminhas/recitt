import { Pipe, PipeTransform } from '@angular/core';
import { IAddress } from '@recitt/types';

@Pipe({
  name: 'ukAddress',
  standalone: true,
  pure: true,
})
export class UkAddressPipe implements PipeTransform {
  transform(address: IAddress | null | undefined): string {
    if (!address) {
      return '';
    }

    const lines = [
      address.building,
      address.street,
      address.town,
      address.county,
      this.formatPostcode(address.postcode),
    ];
    return lines.filter(Boolean).join('\n');
  }

  private formatPostcode(postcode: string): string {
    return postcode?.toUpperCase().trim() ?? '';
  }
}
