/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { configuration } from './configuration';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	readonly config = configuration;
	readonly apiUrl = 'api/posts';

	constructor(private http: HttpClient) {}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: Error): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	getConfig() {
		return this.config;
	}

	getSettings<T>(database: string, id?: number): Observable<T> {
		const url = id ? `api/${database}/${id}` : `api/${database}`;
		return this.http
			.get<T>(url)
			.pipe(
				catchError(this.handleError<T>(`Error getting data from ${database}`))
			);
	}

	getPageData<T>(database: string, id?: number): Observable<T> {
		return this.getSettings<T>(database, id).pipe(
			catchError(error => {
				console.error('Error fetching feature data:', error);
				return throwError(
					() => new Error('Failed to fetch settings. Please try again later.')
				);
			})
		);
	}
}
