import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeeList:any[] = [];
  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  emp:any;
  constructor(private _service:SharedService) { }

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick()
  {
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png",
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
  }

  editClick(item:any)
  {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  closeClick()
  {
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }

  deleteClick(item:any)
  {
    if(confirm('Are you sure??'))
    {
      this._service.deleteEmployee(item.EmployeeId).subscribe(data=>
        {
          alert(data.toString());
          this.refreshEmpList();
        });
    }
  }

  refreshEmpList()
  {
    //subscribe method makes sure to wait till the response 
    //is received from the API Call then only assign value to the department list
    //This is a asynchronous operation
    this._service.getEmpList().subscribe(data=>{
      this.EmployeeList = data;
    });
  }

}
