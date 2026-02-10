import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="stepper-wrap">
      <div class="stepper">
        <button
          *ngFor="let s of steps; let i = index"
          type="button"
          class="step"
          [class.active]="i === active"
          (click)="setActive(i)"
          [attr.aria-current]="i === active"
        >
          <div class="circle">{{ i + 1 }}</div>
          <div class="text">
            <div class="title">{{ s.title }}</div>
            <div class="subtitle">{{ s.subtitle }}</div>
          </div>
          <div *ngIf="i < steps.length - 1" class="bar"></div>
        </button>
      </div>
    </nav>
  `,
  styles: [
    `
      .stepper-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 8px 12px;
        background: transparent;
        overflow: hidden;
      }
      .stepper {
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
        flex-wrap: nowrap;
        justify-content: space-between;
      }
      .step {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 6px;
        position: relative;
        background: transparent;
        border: 0;
        padding: 6px 4px 8px;
        border-radius: 8px;
        cursor: pointer;
        flex: 1 1 0;
        min-width: 0;
      }
      .step:focus {
        outline: 2px solid rgba(59, 130, 246, 0.18);
      }
      .circle {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eef2ff;
        color: #0f1724;
        font-weight: 600;
        font-size: 12px;
      }
      .step.active .circle {
        background: #60a5fa;
        color: #fff;
      }
      .text {
        color: #0f1724;
        text-align: center;
        max-width: 120px;
      }
      .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 1.1;
      }
      .subtitle {
        font-size: 11px;
        color: #6b7280;
      }
      .bar {
        position: absolute;
        right: -24px;
        top: 12px;
        width: 48px;
        height: 4px;
        background: linear-gradient(90deg, #bfdbfe, #93c5fd);
        border-radius: 4px;
      }
      @media (max-width: 1200px) {
        .text {
          max-width: 96px;
        }
        .bar {
          width: 32px;
          right: -16px;
        }
      }
      @media (max-width: 900px) {
        .subtitle {
          display: none;
        }
        .text {
          max-width: 80px;
        }
      }
    `,
  ],
})
export class StepperComponent {
  @Input() steps: Array<{ title: string; subtitle?: string }> = [];
  @Input() active = 0;
  @Output() activeChange = new EventEmitter<number>();

  setActive(i: number) {
    this.active = i;
    this.activeChange.emit(i);
  }
}
