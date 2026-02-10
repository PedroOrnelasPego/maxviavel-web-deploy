import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent],
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
