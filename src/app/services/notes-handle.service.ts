import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesHandleService {

  IDBrequest = indexedDB.open('notes',1);

  constructor() { }
  
  openDB(): void {
    const IDBopen = this.IDBrequest;
    IDBopen.onupgradeneeded = () => {
      const db = IDBopen.result;
      db.createObjectStore('texts',{
        autoIncrement: true
      })
    }
  }

  addNote(textcontent: string, x: number, y: number): void {
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.add({
      textcontent: textcontent,
      x: x,
      y: y
    })
    IDBquery.IDBtransaction.onerror = () => {
      console.log("Error: Can't connect to DB, try it later");
    }
  }

  updateNote(textcontent: string, x: number, y: number, id: number|null){
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.put({
      textcontent: textcontent,
      x: x,
      y: y
    }, id)
    IDBquery.IDBtransaction.onerror = () => {
      console.log("Error: Can't connect to DB, try it later");
    }
  }

  deleteNote(id: number|null){
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.delete(id);
    IDBquery.IDBtransaction.onerror = () => {
      console.log("Error: Can't connect to DB, try it later");
    }
  }

  getNotes(query: any, generate: (obj: Object) => void): any{
    this.IDBrequest.onsuccess = () => {
      const db = this.IDBrequest.result;
      const IDBtransaction = db.transaction('texts', query);
      const objStore = IDBtransaction.objectStore('texts');
      const cursor = objStore.openCursor();
      cursor.addEventListener('success',()=>{
        if (cursor.result){
          generate({
            textcontent: cursor.result.value.textcontent,
            x: cursor.result.value.x,
            y: cursor.result.value.y,
            key: cursor.result.key
          });
          cursor.result.continue() ;
        }
      })
    }
  }

  getLastKey(): any {
    return new Promise((resolve,reject)=>{
      const IDBquery = this.dbTransaction('readonly');
      const dbKeys = IDBquery.objStore.getAllKeys();
      IDBquery.IDBtransaction.oncomplete = () => {
        let lastKey = dbKeys.result[dbKeys.result.length - 1];
        resolve(lastKey);
      }
      IDBquery.IDBtransaction.onerror = () => {
        reject("Error: Can't connect to DB, try it later");
      }
    })
  }

  dbTransaction(query: any): any {
      const db = this.IDBrequest.result;
      const IDBtransaction = db.transaction('texts', query);
      const objStore = IDBtransaction.objectStore('texts');
      return {
        objStore: objStore,
        IDBtransaction: IDBtransaction
      }
  }
}
