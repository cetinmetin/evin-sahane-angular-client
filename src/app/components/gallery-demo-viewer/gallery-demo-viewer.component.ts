import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { GalleryModel } from '../../models/gallery.model';
import {
	Gallery,
	GalleryItem,
	ImageItem,
	ImageSize,
	ThumbnailsPosition,
} from 'ng-gallery';
import { ConfigService } from '../../services/config.service';
import { Image } from '../../models/image.model';
import { ImageBlockComponent } from '../../pages/gallery/image-block/image-block.component';
import { LightboxDirective } from 'ng-gallery/lightbox';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-gallery-demo-viewer',
	standalone: true,
	imports: [
		ImageBlockComponent,
		LightboxDirective,
		AsyncPipe,
		NgClass,
		RouterLink,
	],
	templateUrl: './gallery-demo-viewer.component.html',
	styleUrls: [
		'./gallery-demo-viewer.component.css',
		'../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
	],
})
export class GalleryDemoViewerComponent implements OnInit {
	gallery$: Promise<GalleryModel>;
	galleryImages: GalleryItem[];
	maxViewCount: number = 3;
	demoViewerContainerClass = '';
	constructor(
		private config: ConfigService,
		private gallery: Gallery
	) {}

	ngOnInit() {
		this.gallery$ = this.randomizeImageFolders();
		this.generateDemoViewerContainerClass();
	}
	// setGalleryData(images: Image[], folderName: string) {
	// 	this.galleryImages = images.map(
	// 		(image: Image) =>
	// 			new ImageItem({
	// 				src:
	// 					'../assets/images/gallery-images/' + folderName + '/' + image.name,
	// 				thumb:
	// 					'../assets/images/gallery-images/' + folderName + '/' + image.name,
	// 			})
	// 	);
	// 	this.gallery.ref().load(this.galleryImages);
	// 	this.gallery.ref().setConfig({
	// 		imageSize: ImageSize.Cover,
	// 		thumbPosition: ThumbnailsPosition.Bottom,
	// 	});
	// }
	async randomizeImageFolders(): Promise<GalleryModel> {
		const galleryModel: GalleryModel = await firstValueFrom(
			this.config.getPageData<GalleryModel>('pages', 8)
		);
		galleryModel.imageFolders = this.shuffleArray(galleryModel.imageFolders);
		while (galleryModel.imageFolders.length > this.maxViewCount) {
			const randomIndex = Math.floor(Math.random() * this.maxViewCount);
			galleryModel.imageFolders.splice(randomIndex, 1);
		}
		return galleryModel;
	}
	async generateDemoViewerContainerClass() {
		const maxColVal: number = 12;
		const galleryFolderCount: number = await this.gallery$.then(
			(galleryModel: GalleryModel) => galleryModel.imageFolders.length
		);
		this.demoViewerContainerClass = `m-0 p-1 col-md-${Math.ceil(maxColVal / galleryFolderCount)}`;
	}
	shuffleArray(array) {
		for (let i = array.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
}
