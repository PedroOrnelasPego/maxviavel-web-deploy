import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCardComponent } from '../../components/action-card/action-card.component';
import { Router } from '@angular/router';
import {
  NovoProjetoComponent,
  NovoProjetoFormValue,
} from './novo-projeto/novo-projeto.component';
import { StudyStoreService } from '../../services/study-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ActionCardComponent, NovoProjetoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showCreateModal = false;

  constructor(
    private router: Router,
    private studyStore: StudyStoreService,
  ) {}

  onCreateStudy() {
    this.showCreateModal = true;
  }

  onConsultStudy() {
    this.router.navigate(['/estudos/consultar']);
  }

  onApproveStudy() {
    this.router.navigate(['/estudos/aprovar']);
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  confirmCreate(formValue: NovoProjetoFormValue) {
    const createdStudy = this.studyStore.create({
      name: formValue.name,
      description: formValue.description,
      startDate: formValue.startDate,
      identifier: formValue.identifier,
      stateId: formValue.stateId,
      stateName: formValue.stateName,
      cityId: formValue.cityId,
      cityName: formValue.cityName,
      type: formValue.type,
    });

    this.showCreateModal = false;
    this.router.navigate(['/estudo'], {
      queryParams: {
        studyId: createdStudy.id,
        mode: 'editar',
      },
    });
  }
}
