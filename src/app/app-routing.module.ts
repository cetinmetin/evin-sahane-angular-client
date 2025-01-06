import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		loadComponent: () =>
			import('./pages/home-page/home-page.component').then(
				mod => mod.HomePageComponent
			),
	},
	{
		path: 'about',
		loadComponent: () =>
			import('./pages/about/about-page/about-page.component').then(
				mod => mod.AboutPageComponent
			),
	},
	{
		path: 'services',
		loadComponent: () =>
			import('./pages/services-page/services-page.component').then(
				mod => mod.ServicesPageComponent
			),
	},
	{
		path: 'testimonials',
		loadComponent: () =>
			import('./pages/testimonial/testimonial-page/testimonial-page.component').then(
				mod => mod.TestimonialPageComponent
			),
	},
	{
		path: 'gallery',
		loadComponent: () =>
			import('./pages/gallery/gallery-page/gallery-page.component').then(
				mod => mod.GalleryPageComponent
			),
	},
	{
		path: 'clients-page',
		loadComponent: () =>
			import('./pages/clients/clients-page/clients-page.component').then(
				mod => mod.ClientsPageComponent
			),
	},
	{
		path: 'pricing',
		loadComponent: () =>
			import('./pages/pricing/pricing-page/pricing-page.component').then(
				mod => mod.PricingPageComponent
			),
	},
	{
    path: '**', loadComponent: () =>
      import('./pages/notfound-page/notfound-page.component').then(
        mod => mod.NotfoundPageComponent
      ),
  },
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule {}
