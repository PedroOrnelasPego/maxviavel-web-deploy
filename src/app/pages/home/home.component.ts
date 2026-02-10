import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCardComponent } from '../../components/action-card/action-card.component';
import { Router } from '@angular/router';
import { NovoProjetoComponent } from './novo-projeto/novo-projeto.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ActionCardComponent, NovoProjetoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showCreateModal = false;

  constructor(private router: Router) {}

  onCreateStudy() {
    this.showCreateModal = true;
  }

  onConsultStudy() {}

  onApproveStudy() {}

  closeCreateModal() {
    this.showCreateModal = false;
  }

  confirmCreate() {
    this.showCreateModal = false;
    this.router.navigate(['/estudo']);
  }
}
