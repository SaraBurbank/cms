import { Component } from '@angular/core';
import { DropdownDirective } from './dropdown';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'cms-header',
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
