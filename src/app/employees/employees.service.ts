import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Employee } from '../shared/models/employee.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  employeeUrl = environment.apiURL + '/employees';
  relationshipUrl = environment.apiURL + '/relationship';
  benefitsUrl = environment.apiURL + '/benefits';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.employeeUrl, {withCredentials: false})
      .pipe(
        catchError(this.handleError('getEmployees', []))
      );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.employeeUrl + `/${id}`)
      .pipe(
        catchError(this.handleError<Employee>('getEmployee'))
      );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeeUrl, employee, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('saveEmployee'))
      );
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.employeeUrl, employee, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addEmployee'))
      );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.employeeUrl + `/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteEmployee'))
      );
  }

  getRelationshipTypes(): Observable<any> {
    return this.http.get<any>(this.relationshipUrl + '/types')
      .pipe(
        catchError(this.handleError<any>('getRelationshipTypes'))
      )
  }

  getBenefitPackages(): Observable<any> {
    return this.http.get<any>(this.benefitsUrl + '/packages')
      .pipe(
        catchError(this.handleError<any>('getBenefitPackages'))
      )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
