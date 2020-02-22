import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PersistenceService, StorageType } from 'angular-persistence';
import { constants } from 'src/environments/environment';
import { Session } from '../interfaces/session';
import { SecurityService } from '../services/security.service';
import { validateProfile } from '../helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private persistenceService: PersistenceService, private router: Router, private securityService: SecurityService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let session: Session = this.persistenceService.get(constants.SESSION, StorageType.SESSION);
    return session ? validateProfile(next.data, session.user.modules) : false;
  }

}
