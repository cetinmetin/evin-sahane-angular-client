/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, throwError, catchError } from 'rxjs';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Service } from '../../models/service.model';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FeatureBlockComponent } from '../about/feature-block/feature-block.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ScrollDirective } from '../../directives/scroll.directive';
import { GalleryDemoViewComponent } from '../../components/gallery-demo-view/gallery-demo-view.component';
import { GalleryPageComponent } from '../gallery/gallery-page/gallery-page.component';

@Component({
	selector: 'app-services-page',
	templateUrl: './services-page.component.html',
	standalone: true,
  styleUrls: [
    './services-page.css',
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
  imports: [
    AsyncPipe,
    FeatureBlockComponent,
    MatGridList,
    MatGridTile,
    NgOptimizedImage,
    ScrollDirective,
    GalleryDemoViewComponent,
    GalleryPageComponent,
  ],
})
export class ServicesPageComponent implements OnInit {
	servicesContent$: Observable<Service> = new Observable();
  @ViewChildren('itemRef', { read: ElementRef })
  itemRefs: QueryList<ElementRef>;

	constructor(private config: ConfigService) {}

	ngOnInit() {
		this.getPageData('pages', 3);
	}

	getPageData(database: string, id?: number) {
		this.servicesContent$ = this.config.getSettings<Service>(database, id).pipe(
			catchError(error => {
				console.error('Error fetching feature data:', error);
				return throwError(error);
			})
		);
	}
}
