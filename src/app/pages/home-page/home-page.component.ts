import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { Home } from '../../models/home.model';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollDirective } from '../../directives/scroll.directive';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	standalone: true,
  styleUrls:['./home-page.css'],
  imports: [RouterLink, AsyncPipe, NgForOf, ScrollDirective],
})
export class HomePageComponent implements OnInit {
	homeContent$: Observable<Home>;
  @ViewChildren('itemRef', { read: ElementRef }) itemRefs: QueryList<ElementRef>;
  @ViewChild('homeContainer', { static: false }) container: ElementRef;

	constructor(private config: ConfigService) {}

	ngOnInit() {
    this.homeContent$ = this.config.getPageData<Home>('pages', 7);
	}
}
