import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() steps: Array<{ title: string; subtitle?: string }> = [];
  @Input() active = 0;
  @Output() activeChange = new EventEmitter<number>();

  setActive(i: number): void {
    this.active = i;
    this.activeChange.emit(i);
  }
}
