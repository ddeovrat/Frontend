import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  DepartmentList:any[] = [];
  ModalTitle:string="";
  ActivateAddEditDepComp:boolean=false;
  dep:any;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:string[]=[];
  constructor(private _service:SharedService) { }

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick()
  {
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;
  }

  editClick(item:any)
  {
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  closeClick()
  {
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }

  deleteClick(item:any)
  {
    if(confirm('Are you sure??'))
    {
      this._service.deleteDepartment(item.DepartmentId).subscribe(data=>
        {
          alert(data.toString());
          this.refreshDepList();
        });
    }
  }

  refreshDepList()
  {
    //subscribe method makes sure to wait till the response 
    //is received from the API Call then only assign value to the department list
    //This is a asynchronous operation
    this._service.getDepList().subscribe(data=>{
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter=data;
    });
  }

  FilterFn()
  {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter =  this.DepartmentNameFilter
    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase())
    })
  }

  sortResult(identity:any,ascending:boolean)
  {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a,b){
      if(ascending)
      {
        return (a[identity]>b[identity])?1:((a[identity]<b[identity])?-1:0);
      }
      else
      {
        return (b[identity]>a[identity])?1:((b[identity]<a[identity])?-1:0); 
      }
    })
  }

}
