import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  weatherData: any
  foreCastData: any
  searchMatch: any
  c_day:any
  c_name:any
  c_region: any
  c_icon: any
  c_text: any
  c_currTemp: any
  c_maxTemp: any
  c_minTemp: any
  c_windSpeed: any
  c_humidity: any

  unit:any
  city='Type atleast 3 letters..'
  lat_lon :any
  cityKey:any
  day:any
  date:any
  dayCode:any
  tempCall: any
  windCall: any
  humPreCall: any
  button:any

  constructor(private ds:DataService) { }

  ngOnInit(): void {
  }

  fetchMatch() {
    if(this.city.length>2){
      this.ds.fetchMatch(this.city)
    .subscribe((result:any)=>{
      if(result.length>0){
        this.searchMatch = result.slice(0, 5)
      }
    },(result:any)=>{
      alert(result.error.message)
    })
    }
    else{
      this.searchMatch = ""
    }
  }

  fetchCity(event: any) {
    const targetEl = event.currentTarget || event.target
    this.city = targetEl.innerText
    this.lat_lon = targetEl.id
    this.searchMatch = ""
    this.fetchTemp()
  }

  fetchTemp() {
    this.ds.fetchTemp(this.lat_lon)
    .subscribe((result:any)=>{
      if(result){
        this.weatherData = result
        this.foreCastData = result.forecast.forecastday
        this.tempCall = true;
        // weatherapi
        this.c_name = this.weatherData.location.name
        this.c_region = this.weatherData.location.region
        // this.c_icon = this.weatherData.current.condition.icon
        // this.c_text = this.weatherData.current.condition.text
        // this.c_currTemp = this.weatherData.current.temp_c
        // this.c_maxTemp = this.weatherData.current.feelslike_c
        // this.c_minTemp = ""
        // this.c_windSpeed = this.weatherData.current.wind_kph
        // this.c_humidity = this.weatherData.current.humidity
        
        // forecast
        this.c_day = this.unixToDate(this.foreCastData[0].date_epoch)
        this.c_icon = this.foreCastData[0].day.condition.icon
        this.c_text = this.foreCastData[0].day.condition.text
        this.c_currTemp = this.foreCastData[0].day.avgtemp_c
        this.c_maxTemp = this.foreCastData[0].day.maxtemp_c
        this.c_minTemp = this.foreCastData[0].day.mintemp_c
        this.c_windSpeed = this.foreCastData[0].day.maxwind_kph
        this.c_humidity = this.foreCastData[0].day.avghumidity
        this.dayCodeSave()
      }
    },(result:any)=>{
      alert(result.error.message)
    })
  }

  isLightTheme = false;

  toggleTheme() {
    const element = document.body;
    this.isLightTheme = !this.isLightTheme;
    element.classList.toggle('light-theme', this.isLightTheme);
    element.classList.toggle('dark-theme', !this.isLightTheme);
  }

  dayCodeSave(){
    this.dayCode = this.foreCastData.map((arr:any)=>arr.date_epoch)
  }

  humPre() {
    this.tempCall = false;
    this.windCall = false;
    this.humPreCall = true;
  }

  wind() {
    this.tempCall = false;
    this.windCall = true;
    this.humPreCall = false;
  }

  temp() {
    this.tempCall = true;
    this.windCall = false;
    this.humPreCall = false;
  }

  display(event: any) {
    // Use currentTarget so the click/keyboard activation is read from the
    // element the handler is bound to (the forecast card), not whichever
    // inner element (icon, heading, etc.) triggered the bubbled event.
    this.date = (event.currentTarget || event.target).id
    for (let selectedDay of this.foreCastData) {
      if (selectedDay.date_epoch == this.date) {
        this.c_day = this.unixToDate(selectedDay.date_epoch)
        this.c_icon = selectedDay.day.condition.icon
        this.c_text = selectedDay.day.condition.text
        this.c_currTemp = selectedDay.day.avgtemp_c
        this.c_maxTemp = selectedDay.day.maxtemp_c
        this.c_minTemp = selectedDay.day.mintemp_c
        this.c_windSpeed = selectedDay.day.maxwind_kph
        this.c_humidity = selectedDay.day.avghumidity
        this.weatherData = true
      }
    }
  }

  unixToDate(timestamp: any) {
    var a = new Date(timestamp * 1000);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[a.getDay()];
    var time = day;
    return time;
  }


// end bracket
}
