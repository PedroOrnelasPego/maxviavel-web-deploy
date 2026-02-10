import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" (click)="onClick()">
      <div class="icon">{{ icon }}</div>
      <div class="title">{{ title }}</div>
    </div>
  `,
  styles: [
    `
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 140px;
        height: 112px;
        background: #eef2ff;
        color: #0f1724;
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(2, 6, 23, 0.06);
        cursor: pointer;
      }
      .card:hover {
        transform: translateY(-4px);
        transition: transform 0.18s;
      }
      .icon {
        font-size: 24px;
      }
      .title {
        font-weight: 600;
        text-align: center;
      }
    `,
  ],
})
export class ActionCardComponent {
  @Input() title = '';
  @Input() icon = '⚙️';
  @Output() select = new EventEmitter<void>();

  onClick() {
    /* placeholder: parent can attach handler via (click) on component element */
    this.select.emit();
  }
}
