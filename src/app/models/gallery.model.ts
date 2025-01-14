import { Image } from './image.model';
import { ImageFolder } from './image-folder.model';

export class Gallery {
	id: number;
	name: string;
	tagline: string;
	mainImages: Image[];
	imageFolders: ImageFolder[];
}
