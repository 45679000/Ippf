import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatomotrackerserviceService {
  _paq: any [] = []

  constructor() { }
  trackPageView() {
    this._paq.push(['setCustomUrl', window.location.href]);
    this._paq.push(['trackPageView']);
  }

  trackEvent(category: string, action: string, name?: string, value?: number) {
    this._paq.push(['trackEvent', category, action, name, value]);
  }
}
