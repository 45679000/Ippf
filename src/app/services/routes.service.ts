import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  previousUrl: string = ''
  currentUrl: string = ''
  constructor() { }
  changePrevious(url: string) {
    this.previousUrl = url
  }
  changeCurrent(url: string) {
    this.currentUrl = url
  }
}
