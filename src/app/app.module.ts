import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './core/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		SharedModule,
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptorService,
		multi: true,
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
