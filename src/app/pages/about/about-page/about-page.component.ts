import { Observable, throwError, catchError } from 'rxjs';
import {
	Component,
	ElementRef,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Intro } from '../../../models/intro.model';
import { Feature } from '../../../models/feature.model';
import { AsyncPipe, NgForOf, NgOptimizedImage } from '@angular/common';
import { FeatureBlockComponent } from '../feature-block/feature-block.component';
import { ScrollDirective } from '../../../directives/scroll.directive';
import { RouterLink } from '@angular/router';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
	selector: 'app-about-page',
	templateUrl: './about-page.component.html',
	standalone: true,
	styleUrls: [
		'./about-page.css',
		'../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
	],
	imports: [
		FeatureBlockComponent,
		AsyncPipe,
		ScrollDirective,
		NgForOf,
		RouterLink,
		NgOptimizedImage,
		MatGridList,
		MatGridTile,
	],
})
export class AboutPageComponent implements OnInit {
	aboutContent$: Observable<Intro>;
	features$: Observable<Feature[]>;
	@ViewChildren('itemRef', { read: ElementRef })
	itemRefs: QueryList<ElementRef>;

	constructor(private config: ConfigService) {}

	ngOnInit(): void {
		this.getPageData('pages', 1);
		this.getBlockData('features');
	}

	getPageData(database: string, id?: number): void {
		this.aboutContent$ = this.config.getSettings(database, id).pipe(
			catchError(error => {
				console.error('Error fetching intro data:', error);
				return throwError(error);
			})
		);
	}

	getBlockData(database: string) {
		this.features$ = this.config.getSettings(database).pipe(
			catchError(error => {
				console.error('Error fetching feature data:', error);
				return throwError(error);
			})
		);
	}
}
