import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { EmployeesComponent } from './employees.component';


const routes: Routes = [
  {
    path: ':id',
    component: EmployeesComponent
    // path: 'add', component:
  },
  {
    path: '',
    component: EmployeesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
