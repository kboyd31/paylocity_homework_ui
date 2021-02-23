import { Person } from './person.model';
import { BenefitPackage } from './benefit-package.model';

export class Employee extends Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public dependents: Person[],
    public benefitPackage: BenefitPackage,
    public salary: number,
    public payFrequency: number) {
    super(firstName, lastName, 'EMPLOYEE');
  }
}