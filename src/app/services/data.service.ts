import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  fetchMatch(city:any){
    return this.http.get(environment.apiUrl+`/search.json?key=741870352f7b4f21a96165324211811&q=${city}`)
  }

  fetchTemp(lat_lon:any){
    return this.http.get(environment.apiUrl+`/forecast.json?key=741870352f7b4f21a96165324211811&q=${lat_lon}&days=10&aqi=no&alerts=no`)
  }


}
