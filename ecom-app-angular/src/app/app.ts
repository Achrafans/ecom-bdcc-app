import { Component, inject, signal } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ecom-app-angular');
  private readonly keycloak = inject(Keycloak);

  get username(): string {
    const token = this.keycloak.tokenParsed;
    return (
      token?.['preferred_username'] ??
      token?.['name'] ??
      token?.['email'] ??
      ''
    );
  }

  get isAdmin(): boolean {
    return this.roles.includes('ADMIN');
  }

  get isUser(): boolean {
    return this.roles.includes('USER');
  }

  private get roles(): string[] {
    const token = this.keycloak.tokenParsed;
    console.log("token ==>",token);
    if (!token) {
      return [];
    }

    const realmRoles: string[] = token['realm_access']?.['roles'] ?? [];
    const clientRoles: string[] =
      token['resource_access']?.[this.keycloak.clientId ?? '']?.['roles'] ?? [];

    return [...realmRoles, ...clientRoles];
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin + '/' });
  }
}
