import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSettings(userName: string) {
    return this.authService.getProfile(userName);
  }

  updateSettings(settingFormValue: any) {
    return this.http.put(config.apiUrl + '/user', {
      user: { ...settingFormValue },
    });
  }
}
