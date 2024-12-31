import {
	Directive,
	ElementRef,
	Input,
	QueryList,
	AfterViewChecked,
	Renderer2,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
	selector: '[appScroll]',
	standalone: true,
})
export class ScrollDirective implements AfterViewChecked {
	@Input() items: QueryList<ElementRef> = new QueryList<ElementRef>();
	private initialized = false;
	currentItemIndex = 0;
	sections: HTMLElement[] = [];
	indicators: HTMLElement[] = [];

	constructor(
		private container: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewChecked(): void {
		if (!this.initialized && this.items.length > 0) {
			// Sections are collected from input items
			this.sections = this.items.map(item => item.nativeElement);
			this.setupScrollEvent();
			this.initialized = true;
			this.createIndicators();
			this.highlightIndicator(0);
		}
	}

	setupScrollEvent() {
		// Debounced scroll listener
		const scroll: Observable<WheelEvent> = fromEvent(
			this.container.nativeElement,
			'wheel'
		);
		scroll
			.pipe(throttleTime(1000))
			.subscribe(event => this.handleScroll(event));
	}

	handleScroll(event: WheelEvent) {
		if (event.deltaY > 0) {
			if (this.currentItemIndex < this.items.length - 1) {
				this.currentItemIndex++;
			}
		} else {
			if (this.currentItemIndex > 0) {
				this.currentItemIndex--;
			}
		}

		const nextSection = this.sections[this.currentItemIndex];
		nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
		this.highlightIndicator(this.currentItemIndex);
	}

	createIndicators() {
		const indicatorContainer = this.renderer.createElement('div');
		this.renderer.setStyle(indicatorContainer, 'position', 'fixed');
		this.renderer.setStyle(indicatorContainer, 'right', '20px');
		this.renderer.setStyle(indicatorContainer, 'top', '50%');
		this.renderer.setStyle(indicatorContainer, 'transform', 'translateY(-50%)');
		this.renderer.setStyle(indicatorContainer, 'display', 'flex');
		this.renderer.setStyle(indicatorContainer, 'flex-direction', 'column');
		this.renderer.setStyle(indicatorContainer, 'gap', '10px');

		this.sections.forEach((_, index) => {
			const indicator = this.renderer.createElement('div');
			this.renderer.setStyle(indicator, 'width', '10px');
			this.renderer.setStyle(indicator, 'height', '10px');
			this.renderer.setStyle(indicator, 'border-radius', '50%');
			this.renderer.setStyle(indicator, 'background-color', '#bbb');
			this.renderer.setStyle(indicator, 'cursor', 'pointer');
			this.renderer.listen(indicator, 'click', () =>
				this.scrollToSection(index)
			);

			this.renderer.appendChild(indicatorContainer, indicator);
			this.indicators.push(indicator);
		});

		this.renderer.appendChild(document.body, indicatorContainer);
	}

	highlightIndicator(index: number) {
		this.indicators.forEach((indicator, i) => {
			const color = i === index ? '#007BFF' : '#bbb';
			this.renderer.setStyle(indicator, 'background-color', color);
		});
	}

	scrollToSection(index: number) {
		this.currentItemIndex = index;
		const nextSection = this.sections[this.currentItemIndex];
		nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
		this.highlightIndicator(this.currentItemIndex);
	}
}
