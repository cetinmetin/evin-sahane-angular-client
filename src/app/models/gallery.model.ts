import { Image } from './image.model';
import { ImageFolder } from './image-folder.model';

export class GalleryModel {
	id: number;
	name: string;
	tagline: string;
	mainImages: Image[];
	imageFolders: ImageFolder[];
}
