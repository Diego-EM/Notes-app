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

  addNote(textcontent: string): void {
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.add({ textcontent: textcontent })
    IDBquery.IDBtransaction.oncomplete = () =>{
      console.log('Note saved successfully');
    }
    IDBquery.IDBtransaction.onerror = () => {
      console.log('Ha ocurrido un error, vuelva a intentarlo mas tarde');
    }
  }

  updateNote(textcontent: string, id: string){
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.put({textcontent: textcontent}, parseInt(id));
    IDBquery.IDBtransaction.oncomplete = () =>{
      console.log('Note updated succesfully');
    }
    IDBquery.IDBtransaction.onerror = () => {
      console.log('Ha ocurrido un error, vuelva a intentarlo mas tarde');
    }
  }

  deleteNote(id: string){
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.delete(parseInt(id));
    IDBquery.IDBtransaction.oncomplete = () =>{
      console.log('Note removed succesfully');
    }
    IDBquery.IDBtransaction.onerror = () => {
      console.log('Ha ocurrido un error, vuelva a intentarlo mas tarde');
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
