import {
	Component,
	OnInit,
	HostListener,
	ViewChild,
	ElementRef,
	Renderer2,
} from '@angular/core';
import { Location } from '@angular/common';
import { ConfigService } from '../shared/services/config.service';
import { NavmenuComponent } from '../navmenu/navmenu.component';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css'],
	standalone: true,
	imports: [NavmenuComponent],
})
export class NavigationComponent implements OnInit {
	menu: { id: number; title: string; link: string }[];
	menuOpen: boolean;
	database = 'menu';
	private _scrollPosition: number;
	@ViewChild('myHeader', { static: true }) myHeaderElement: ElementRef;
	@HostListener('window:scroll', [])
	onWindowScroll() {
		this._scrollPosition = window.scrollY;
		this.calculateStyles(this._scrollPosition);
	}

	constructor(
		private location: Location,
		private config: ConfigService,
		private renderer: Renderer2
	) {}

	ngOnInit() {
		this.menuOpen = false;
		this.getMenu();
		this.calculateStyles(this._scrollPosition);
	}

	toggleMenu(status: boolean) {
		this.menuOpen = status;
	}

	getMenu() {
		this.config.getSettings(this.database).subscribe(setting => {
			this.menu = setting;
		});
	}

	calculateStyles(scrollPosition: number): any {
		scrollPosition > 0
			? this.renderer.removeClass(this.myHeaderElement.nativeElement, 'nav-top')
			: this.renderer.addClass(this.myHeaderElement.nativeElement, 'nav-top');
	}
}
