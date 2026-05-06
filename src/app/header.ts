import { Component, output } from '@angular/core';

@Component({
  selector: 'cms-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  selectedFeatureEvent = output<string>();
  
  onSelect(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
