import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeDto } from '../employee.dto';
import { EmployeeService } from '../employee.service';
import { DialogService } from '../shared/dialog.service';
//import { MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:EmployeeDto[];
  constructor(private employeeService: EmployeeService,
    private dialogService: DialogService,
    private router: Router) { }

  ngOnInit(): void {
   
    this.getEmployees();

  }

  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;
    })
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    
    this.dialogService.openConfirmDialog('Apakah anda akan menghapus data ini?')
    .afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this.employeeService.deleteEmployee(id).subscribe( data => {
          console.log(data);
          this.getEmployees();
        })
      }
    }); 
  }
}
