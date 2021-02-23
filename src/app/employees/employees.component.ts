import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  dialogHeader: string;
  display: boolean;

  constructor(public employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    // this.employeeService.getEmployees().subscribe(employees => {
    //   // for (const employee of employees) {
    //   //   employees.push(new Employee('', '', [], null, 0, 0));
    //   // }
    //   this.employees = employees;
    //   console.log(employees);
    // });
  }

  openAddDialog(): void {
    this.display = true;
  }

  onDialogClose(event: any): void {
    this.display = event;
  }
}
