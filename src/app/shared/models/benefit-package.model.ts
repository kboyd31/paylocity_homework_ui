export class BenefitPackage {
  constructor(
    public id: number,
    public name: string,
    public employeeCostPerYear: number,
    public nonEmployeeCostPerYear: number) {}
}