import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent {
  @Input() title = '';
  @Input() icon = 'project';
  @Input() iconTheme: 'outline' | 'fill' | 'twotone' = 'twotone';
  @Output() select = new EventEmitter<void>();

  onClick() {
    this.select.emit();
  }
}
