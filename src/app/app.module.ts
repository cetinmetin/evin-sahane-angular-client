import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { NavmenuComponent } from './layout/components/navmenu/navmenu.component';
import { NavigationComponent } from './layout/components/navigation/navigation.component';
import { SocialComponent } from './pages/social/social.component';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Services
import { ConfigService } from './services/config.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses.
		// Remove it when a real server is ready to receive requests.
		HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
			dataEncapsulation: false,
			passThruUnknownUrl: true,
		}),
		FooterComponent,
		NavigationComponent,
		NavmenuComponent,
		SocialComponent,
		LayoutComponent,
	],
	providers: [
		ConfigService,
		provideAnimationsAsync(),
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
