import { Component } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { routeTransition } from '../animations';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../components/spinner/loader.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavigationComponent,
    RouterOutlet,
    FooterComponent,
    NgIf,
    LoaderComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  animations: [
    routeTransition
  ],
})
export class LayoutComponent {
 constructor(protected route: ActivatedRoute) {
 }
}
