import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { ConfigService } from '../../shared/services/config.service';
import { Header } from '../models/header.model';
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
	header$: Observable<Header>;
  @ViewChildren('itemRef', { read: ElementRef }) itemRefs: QueryList<ElementRef>;
  @ViewChild('container', { static: false }) container: ElementRef;

	constructor(private config: ConfigService) {}

	ngOnInit() {
		this.getPageData('pages', 7);
	}

	getPageData(database: string, id?: number): void {
		this.header$ = this.config.getSettings(database, id).pipe(
			catchError(error => {
				console.error('Error fetching feature data:', error);
				return throwError(error);
			})
		);
	}
}
