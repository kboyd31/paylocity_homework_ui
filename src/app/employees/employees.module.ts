import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { OverlayPanelModule } from 'primeng/overlaypanel'

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesService } from './employees.service';
import { EmployeesComponent } from './employees.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';



@NgModule({
  declarations: [
    ManageEmployeeComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataViewModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    PanelModule,
    EmployeesRoutingModule,
    OverlayPanelModule
  ],
  providers: [
    EmployeesService
  ]
})
export class EmployeesModule { }
