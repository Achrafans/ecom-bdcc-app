import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const hasRole = ({ grantedRoles }: AuthGuardData, role: string): boolean =>
  grantedRoles.realmRoles.includes(role) ||
  Object.values(grantedRoles.resourceRoles).some((roles) =>
    roles.includes(role)
  );

const requireRole = (role: string): CanActivateFn =>
  createAuthGuard<CanActivateFn>(
    async (
      _route: ActivatedRouteSnapshot,
      _state: RouterStateSnapshot,
      authData: AuthGuardData
    ): Promise<boolean | UrlTree> => {
      if (!authData.authenticated) {
        await authData.keycloak.login({
          redirectUri: window.location.origin + window.location.pathname,
        });
        return false;
      }

      return hasRole(authData, role) ? true : inject(Router).parseUrl('/');
    }
  );

export const adminGuard = requireRole('ADMIN');
export const userGuard = requireRole('USER');
