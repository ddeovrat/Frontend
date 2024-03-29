import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:5000/api";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private _http: HttpClient) { }

  getDepList():Observable<any[]>{
    return this._http.get<any>(this.APIUrl+'/department');
  }

  addDepartment(val:any)
  {
    return this._http.post(this.APIUrl+'/Department',val);
  }

  updateDepartment(val:any)
  {
    return this._http.put(this.APIUrl+'/Department',val);
  }

  deleteDepartment(val:any)
  {
    return this._http.delete(this.APIUrl+'/Department/'+val);
  }

  getEmpList():Observable<any[]>{
    return this._http.get<any>(this.APIUrl+'/Employee');
  }

  addEmployee(val:any)
  {
    return this._http.post(this.APIUrl+'/Employee',val);
  }

  updateEmployee(val:any)
  {
    return this._http.put(this.APIUrl+'/Employee',val);
  }

  deleteEmployee(val:any)
  {
    return this._http.delete(this.APIUrl+'/Employee/'+val);
  }

  UploadPhoto(val:any)
  {
    return this._http.post(this.APIUrl+'/Employee/SaveFile',val);
  }

  getAllDepartmentNames():Observable<any[]>
  {
    return this._http.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  }
}
