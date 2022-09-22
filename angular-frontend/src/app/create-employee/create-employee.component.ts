import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { PositionDto } from '../position.dto';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  positions: PositionDto[];
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPosition();
  }

  getPosition(){
    this.employeeService.getPositionList().subscribe(data=>{ // subscribe to receive value from component.service
      this.positions = data;
    })
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe( data => {
      console.log(data);
      this.goToEmployeeList(); // redirect to list after save
    },
     error => console.log(error)
      
    )
  }

  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }

}
