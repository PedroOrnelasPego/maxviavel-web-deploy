import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  StudyItem,
  StudyStatus,
  StudyStoreService,
} from '../../services/study-store.service';

type StudyListMode = 'editar' | 'consultar' | 'aprovar';

@Component({
  selector: 'app-estudos-lista',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzIconModule],
  templateUrl: './estudos-lista.component.html',
  styleUrls: ['./estudos-lista.component.scss'],
})
export class EstudosListaComponent implements OnInit {
  studies: StudyItem[] = [];
  mode: StudyListMode = 'editar';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly studyStore: StudyStoreService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.mode = this.getModeFromData(data);
      this.reloadStudies();
    });
  }

  get pageTitle(): string {
    if (this.mode === 'consultar') {
      return 'Consultar Estudo';
    }

    if (this.mode === 'aprovar') {
      return 'Aprovar Estudo';
    }

    return 'Editar Estudo';
  }

  get actionLabel(): string {
    if (this.mode === 'consultar') {
      return 'Visualizar';
    }

    if (this.mode === 'aprovar') {
      return 'Aprovar';
    }

    return 'Editar';
  }

  get actionIcon(): string {
    if (this.mode === 'consultar') {
      return 'eye';
    }

    if (this.mode === 'aprovar') {
      return 'check';
    }

    return 'edit';
  }

  get canDelete(): boolean {
    return this.mode === 'editar';
  }

  openStudy(study: StudyItem): void {
    if (this.mode === 'editar') {
      this.router.navigate(['/estudo'], {
        queryParams: { studyId: study.id, mode: this.mode },
      });
      return;
    }

    this.router.navigate(['/estudo'], {
      queryParams: { studyId: study.id, mode: this.mode, readonly: true },
    });
  }

  deleteStudy(study: StudyItem): void {
    const confirmed = window.confirm(`Deseja apagar o estudo "${study.name}"?`);

    if (!confirmed) {
      return;
    }

    this.studyStore.remove(study.id);
    this.reloadStudies();
  }

  formatType(type: string): string {
    return type === 'incorporacao' ? 'Incorporação' : 'Urbanismo';
  }

  formatDate(date: string): string {
    if (!date) {
      return '-';
    }

    const [year, month, day] = date.split('-');
    if (!year || !month || !day) {
      return date;
    }

    return `${day}/${month}/${year}`;
  }

  statusLabel(status: StudyStatus): string {
    if (status === 'concluido') {
      return 'Concluído';
    }

    if (status === 'parecer-emitido') {
      return 'Parecer emitido';
    }

    if (status === 'aprovado') {
      return 'Aprovado';
    }

    if (status === 'excluido') {
      return 'Excluído';
    }

    return 'Rascunho';
  }

  statusColor(status: StudyStatus): string {
    if (status === 'rascunho') {
      return 'processing';
    }

    if (status === 'concluido') {
      return 'blue';
    }

    if (status === 'parecer-emitido') {
      return 'purple';
    }

    if (status === 'aprovado') {
      return 'green';
    }

    if (status === 'excluido') {
      return 'red';
    }

    return 'default';
  }

  private reloadStudies(): void {
    this.studies = this.studyStore.list();
  }

  private getModeFromData(data: Data): StudyListMode {
    const mode = data['mode'];
    if (mode === 'consultar' || mode === 'aprovar') {
      return mode;
    }

    return 'editar';
  }
}
