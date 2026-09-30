import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './navbar.html',
})
export class Navbar {
  @Input() title = '';
}
