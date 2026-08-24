import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  provideKeycloak,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
} from 'keycloak-angular';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Products } from './ui/products/products';
import { Customers } from './ui/customers/customers';

@NgModule({
  declarations: [App, Products, Customers],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [{ urlPattern: /^\/api(\/.*)?$/i }],
    },
    provideKeycloak({
      config: {
        url: 'http://localhost:8888', // URL du serveur Keycloak
        realm: 'bdcc-realm', // Nom du realm Keycloak
        clientId: 'ecom-client-ang', // Client ID (accessType public)
      },
      initOptions: {
        onLoad: 'login-required',
      },
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
