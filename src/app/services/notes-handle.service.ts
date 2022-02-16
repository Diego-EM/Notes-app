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

  updateNote(textcontent: string, id: number|null){
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.put({textcontent: textcontent}, id);
    IDBquery.IDBtransaction.oncomplete = () =>{
      console.log('Note updated succesfully');
    }
    IDBquery.IDBtransaction.onerror = () => {
      console.log('Ha ocurrido un error, vuelva a intentarlo mas tarde');
    }
  }

  deleteNote(id: number|null){
    const IDBquery = this.dbTransaction('readwrite');
    IDBquery.objStore.delete(id);
    IDBquery.IDBtransaction.oncomplete = () =>{
      console.log('Note removed succesfully');
    }
    IDBquery.IDBtransaction.onerror = () => {
      console.log('Ha ocurrido un error, vuelva a intentarlo mas tarde');
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
            key: cursor.result.key
          });
          cursor.result.continue() ;
        } else console.log('lista completa');
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
