import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Item} from '../models/item';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:3003/dev/items';

  dataChange: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Item[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllRental(): void {
    this.httpClient.get<Item[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  addRental (item: Item): void {
    this.dialogData = item;
    this.httpClient.post(this.API_URL, item).subscribe(data =>{
      console.log(JSON.stringify(data));
    },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  updateRental (item: Item): void {
    this.dialogData = item;
    this.httpClient.put(this.API_URL + '/' + item.itemId, item).subscribe(data =>{
      console.log(JSON.stringify(data));
    },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  deleteRental (id: number): void {
    console.log(id);
    this.httpClient.delete(this.API_URL + '/' + id).subscribe(data =>{
      console.log(JSON.stringify(data));
    },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }
}





