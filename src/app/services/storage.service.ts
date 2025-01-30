import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  public getItem(token: string): string | null {
    return localStorage.getItem(token) || null;
  }

  public setItem(token: string, data: string): string {
    localStorage.setItem(token, data);
    return data;
  }

  public removeItem(token: string): boolean {
    localStorage.removeItem(token);
    return true;
  }
}