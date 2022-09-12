import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { EmployeeDto } from './employee.dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/v1/employees"
  constructor(private httpClient: HttpClient) { }

  /**
   * Observable in Angular is a feature that provides support for 
   * delivering messages between different parts of your single-page application. 
   * This feature is frequently used in Angular because it is responsible for handling multiple values, 
   * asynchronous programming in Javascript, and also event handling processes.
   */
  getEmployeeList(): Observable<EmployeeDto[]>{
    return this.httpClient.get<EmployeeDto[]>(`${this.baseURL}`);
  }
  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}
