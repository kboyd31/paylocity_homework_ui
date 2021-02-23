import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { FormControl } from '@angular/forms';
import { Person } from 'src/app/shared/models/person.model';
import { BenefitPackage } from 'src/app/shared/models/benefit-package.model';
import { EmployeesService } from '../employees.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit, OnDestroy {
  private relationshipTypes$ = new Subscription();
  private benefitPackages$ = new Subscription();

  @Input()
  display: boolean;

  @Input()
  dialogHeader: string;

  @Output()
  displayChange = new EventEmitter();

  benefitPackages: BenefitPackage[];
  selectedPackage: BenefitPackage;
  employee: Employee = new Employee('', '', [new Person('', '', '')], undefined, undefined, 26);
  relationshipTypes: any[];

  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    // Get options for relationship types from the API
    this.relationshipTypes$ = this.employeeService.getRelationshipTypes().subscribe(
      (results: any[]) => {
        // Remove the EMPLOYEE type from the drop down, as its not needed on this screen.
        this.relationshipTypes = results.filter((result: any) => result.typeName !== 'EMPLOYEE');
      }
    )

    // Get options for benefit packages from the API
    this.benefitPackages$ = this.employeeService.getBenefitPackages().subscribe(
      (results: any[]) => {
        this.benefitPackages = results;
      }
    )
  }

  // Currently only one discount available
  // Ideally this would come from an API call that would give the discount based on the Employee object
  getDiscount(person: Person = this.employee): number {
    // Convert to upper case to simplify logic
    if (person.firstName && person.firstName.toUpperCase().startsWith('A')) {
      return .1;
    } else {
      return 0;
    }
  }

  addDependent(): void {
    this.employee.dependents.push(new Person('', '', ''));
  }

  // TODO: removeDependent()

  /**
   * Calculate the employee cost for the selected benefit package.
   * Each employee, currently, has a set cost per year. If the discount is applied, then we need to remove that discount from the total cost.
   * If there is no benefit package selected, this will return 0.
   */
  getEmployeeCost(): number {
    if(this.employee.benefitPackage) {
      return this.employee.benefitPackage.employeeCostPerYear - (this.employee.benefitPackage.employeeCostPerYear * this.getDiscount());
    } else {
      return 0;
    }
  }

  /**
   * Calculate the total for the entire benefit package for the employee.
   */
  getTotal(): number {
    return (this.employee.salary * this.employee.payFrequency) - (this.getEmployeeCost() + this.getDependentCost());
  }

  /**
   * Calculate the total cost for dependents of the employee.
   * This is slightly different than the employee cost, not only because of the cost per year being different, but there are multiple dependents that need to be added together.
   */
  getDependentCost(): number {
    let nonEmployeeCost = 0;

    // Dependents length is 1 to start because there's an empty row, so we only want to trigger this after they clicked "Add"
    // TODO: Think of a better way to add dependents as an ADD button isn't always very intuitive like this.
    if(this.employee.dependents.length > 1) {
      for(let i = 0; i < this.employee.dependents.length - 1; i++) {
        nonEmployeeCost += this.employee.benefitPackage.nonEmployeeCostPerYear  - (this.employee.benefitPackage.nonEmployeeCostPerYear * this.getDiscount(this.employee.dependents[i]));
      }
    }

    return nonEmployeeCost;
  }

  onHide() {
    this.displayChange.emit(false);
  }

  ngOnDestroy() {
    this.relationshipTypes$.unsubscribe();
    this.displayChange.unsubscribe();
    this.benefitPackages$.unsubscribe();
  }
}
