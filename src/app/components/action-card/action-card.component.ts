import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent {
  @Input() title = '';
  @Input() icon = '⚙️';
  @Output() select = new EventEmitter<void>();

  onClick() {
    this.select.emit();
  }
}
