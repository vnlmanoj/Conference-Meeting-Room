import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import camelCase from 'lodash/camelCase';
import { Observable } from "rxjs";

@Injectable()
export class AppService {
    api_endpoint = 'http://localhost:8081';

    constructor(public http: HttpClient) {
    }
    put(url:string, body:any){
      return this.http.put(this.getUrl(url),body).pipe(
        map((result:any) => {
            if (result) {
                return this.convertObjectKeys(result, false);
            }
            return null;
        }));
    }

    post(url:string, body:any){
      return this.http.post(this.getUrl(url),body).pipe(
        map((result:any) => {
            if (result) {
                return this.convertObjectKeys(result, false);
            }
            return null;
        }));
    }

    getUrl(url:string){
        return this.api_endpoint + url;
    }

    get(url:string) {
        return this.http.get(this.getUrl(url)).pipe(
            map((result:any) => {
                if (result) {
                    return this.convertObjectKeys(result, false);
                }
                return null;
            }));
    }

    delete(url: string): Observable<any> {
      return this.http.delete(this.getUrl(url)).pipe(
        map((result:any) => {
            if (result) {
                return this.convertObjectKeys(result, false);
            }
            return null;
        }));
    }

    convertObjectKeys(obj:any, isCamelCaseToUnderscore = true): Record<string, any> {
        if (typeof obj != 'object') {
          return obj;
        }
    
        for (const oldName in obj) {
          // Camel to underscore
          let newName: string;
          if (isCamelCaseToUnderscore) {
            newName = oldName.replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase());
          } else {
            // isUnderscoreToCamelCase
            newName = camelCase(oldName);
          }
    
          // Only process if names are different
          if (newName != oldName) {
            // Check for the old property name to avoid a ReferenceError in strict mode.
            if (obj.hasOwnProperty(oldName)) {
              obj[newName] = obj[oldName];
              delete obj[oldName];
            }
          }
    
          if (typeof obj[newName] === 'object' && newName !== 'branchControls') { // I know this is not a great way to take care of this, ideas?
            obj[newName] = this.convertObjectKeys(obj[newName], isCamelCaseToUnderscore);
          }
        }
    
        return obj;
      }
}