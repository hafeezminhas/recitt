import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-tile',
  imports: [],
  templateUrl: './info-tile.html',
  styleUrl: './info-tile.scss',
})
export class InfoTileComponent {
  label = input.required<string>();
  value = input();
}
