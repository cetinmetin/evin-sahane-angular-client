import { Image } from './image.model';

export class ImageFolder {
	id: number;
	folderName: string;
  description: string;
	folderBannerImage: Image;
	images: Image[];
}
