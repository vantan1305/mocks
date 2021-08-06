import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public listUser: any;
  public users:any;
  constructor() { }
}
