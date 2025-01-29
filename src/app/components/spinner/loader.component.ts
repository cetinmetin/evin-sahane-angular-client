import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { delay, Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
	selector: 'app-loader',
	standalone: true,
	imports: [MatProgressSpinner, NgIf, AsyncPipe],
	templateUrl: './loader.component.html',
	styleUrl: './loader.component.css',
})
export class LoaderComponent implements OnInit {
	loading$: Observable<boolean>;
	constructor(private loaderService: LoaderService) {}
	ngOnInit(): void {
		this.loading$ = this.loaderService.loading$.pipe(delay(1000));
	}
}
