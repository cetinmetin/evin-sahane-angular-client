import { Observable, throwError, catchError } from 'rxjs';
import {
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
	OnInit,
	QueryList,
	Renderer2,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { Image } from '../../../models/image.model';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ImageBlockComponent } from '../image-block/image-block.component';
import { ScrollDirective } from '../../../directives/scroll.directive';
import { GalleryModel } from '../../../models/gallery.model';
import {
	Gallery,
	GalleryComponent,
	GalleryItem,
	GalleryModule,
	ImageItem,
	ImageSize,
	ThumbnailsPosition,
} from 'ng-gallery';
import { GallerizeDirective, LightboxDirective } from 'ng-gallery/lightbox';

@Component({
	selector: 'app-gallery-page',
	templateUrl: './gallery-page.component.html',
	standalone: true,
	styleUrls: [
		'./gallery-page.css',
		'../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
	],
	imports: [
		ImageBlockComponent,
		AsyncPipe,
		ScrollDirective,
		GalleryModule,
		NgForOf,
		GallerizeDirective,
		LightboxDirective,
	],
})
export class GalleryPageComponent implements OnInit {
	gallery$: Observable<GalleryModel> = new Observable();
	galleryImages: GalleryItem[];
	@ViewChildren('itemRef', { read: ElementRef })
	itemRefs: QueryList<ElementRef>;
	@Input() isDemoViewer: boolean = false;
	@ViewChildren('galleryDemoViewContainer', { read: ElementRef })
	galleryDemoViewContainer: QueryList<ElementRef>;
	@ViewChildren('galleryContainer', { read: ElementRef }) set content(
		galleryContainer: QueryList<ElementRef>
	) {
		if (galleryContainer && this.galleryDemoViewContainer.first) {
			this.switchDemoOrNormalComponent(galleryContainer);
		}
	}
	constructor(
		private config: ConfigService,
		private gallery: Gallery,
	) {}

	ngOnInit() {
		this.gallery$ = this.config.getPageData<GalleryModel>('pages', 8);
	}
	setGalleryData(images: Image[], folderName: string) {
		this.galleryImages = images.map(
			(image: Image) =>
				new ImageItem({
					src:
						'../assets/images/gallery-images/' + folderName + '/' + image.name,
					thumb:
						'../assets/images/gallery-images/' + folderName + '/' + image.name,
				})
		);
		this.gallery.ref().load(this.galleryImages);
		this.gallery.ref().setConfig({
			imageSize: ImageSize.Cover,
			thumbPosition: ThumbnailsPosition.Bottom,
		});
	}
	switchDemoOrNormalComponent(galleryContainer: QueryList<ElementRef>) {
		if (this.isDemoViewer) {
			this.galleryDemoViewContainer.first.nativeElement.style.display = 'block';
			galleryContainer.first.nativeElement.style.display = 'none';
		} else {
			this.galleryDemoViewContainer.first.nativeElement.style.display = 'none';
			galleryContainer.first.nativeElement.style.display = 'block';
		}
	}
}
