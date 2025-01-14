import { Observable, throwError, catchError } from 'rxjs';
import {
	Component,
	ElementRef,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Image } from '../../../models/image.model';
import { AsyncPipe } from '@angular/common';
import { ImageBlockComponent } from '../image-block/image-block.component';
import { ScrollDirective } from '../../../directives/scroll.directive';
import { Gallery } from '../../../models/gallery.model';

@Component({
	selector: 'app-gallery-page',
	templateUrl: './gallery-page.component.html',
	standalone: true,
	styleUrls: [
		'./gallery-page.css',
		'../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
	],
	imports: [ImageBlockComponent, AsyncPipe, ScrollDirective],
})
export class GalleryPageComponent implements OnInit {
	gallery$: Observable<Gallery> = new Observable();
	@ViewChildren('itemRef', { read: ElementRef })
	itemRefs: QueryList<ElementRef>;

	constructor(private config: ConfigService) {}

	ngOnInit() {
		this.gallery$ = this.config.getPageData<Gallery>('pages', 8);
	}
}
