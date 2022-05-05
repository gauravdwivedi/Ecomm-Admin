import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _data = new Subject<any>();

  dataTransfer$ = this._data.asObservable();


  constructor() { }

  sendData(data: any) {
    this._data.next(data);
  }

  sendDetail(data: any) {
    this._data.next(data)
  }

}
