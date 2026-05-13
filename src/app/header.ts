import { Component, output } from '@angular/core';
import { DropdownDirective } from './dropdown';

@Component({
  selector: 'cms-header',
  imports: [DropdownDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  selectedFeatureEvent = output<string>();
  
  onSelect(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
