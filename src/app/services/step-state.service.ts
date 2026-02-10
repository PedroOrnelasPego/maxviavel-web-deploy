import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepStateService {
  private readonly activeStepSubject = new BehaviorSubject<number>(0);
  readonly activeStep$ = this.activeStepSubject.asObservable();

  get activeStep(): number {
    return this.activeStepSubject.value;
  }

  setActiveStep(stepIndex: number): void {
    this.activeStepSubject.next(stepIndex);
  }
}
