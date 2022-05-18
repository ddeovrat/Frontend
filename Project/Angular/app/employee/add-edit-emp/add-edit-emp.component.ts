import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input()
  emp:any;
  
  DepartmentList:any;
  EmployeeId:number=0;
  EmployeeName:string="";
  Department:string="";
  DateOfJoining:string="";
  PhotoFileName:string="";
  PhotoFilePath:string="";

  constructor(private _service:SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList()
  {
    this._service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentList=data;
      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this._service.PhotoUrl+"/"+this.PhotoFileName;
    });

  }

  addEmployee()
  {
    var val = {EmployeeId: this.EmployeeId,
              Department:this.Department,
              EmployeeName:this.EmployeeName,
              DateOfJoining:this.DateOfJoining,
              PhotoFileName:this.PhotoFileName };
    this._service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });

    alert(this.EmployeeName+"---" +this.PhotoFileName);
  }
  updateEmployee()
  {
    var val = {EmployeeId: this.EmployeeId,
      Department:this.Department,
      EmployeeName:this.EmployeeName,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName};
      this._service.updateEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadPhoto(event:any)
  {
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile',file,file.name);

    this._service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName = data.toString();      
      this.PhotoFilePath = this._service.PhotoUrl+"/"+this.PhotoFileName;
    });
  }

}
