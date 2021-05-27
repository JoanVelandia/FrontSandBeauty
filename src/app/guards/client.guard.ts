import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../core/services/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ClientGuard implements CanActivate {

  constructor(private localStorage: LocalStorageService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.localStorage.getRolClient() == true){
        return true;
    }
    return false;
  }

}
