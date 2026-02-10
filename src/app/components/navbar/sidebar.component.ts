import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { StepStateService } from '../../services/step-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzToolTipModule,
  ],
  // expose collapsed as a host class so parent CSS selectors can react to it
  host: {
    '[class.collapsed]': 'isCollapsed',
  },
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  activeStep = 0;

  readonly steps = [
    'Identificacao do projeto',
    'Cenarios',
    'Orcamento de obras',
    'Negociacao de terreno',
    'Estruturacao da receita',
    'Estruturacao das despesas e custos',
    'Estruturacao das fontes de recursos',
    'Sensibilidade de riscos',
    'Resultado',
  ];

  private stepSub?: Subscription;

  constructor(
    private router: Router,
    private stepState: StepStateService,
  ) {}

  get isStudyRoute(): boolean {
    return this.router.url.startsWith('/estudo');
  }

  ngOnInit(): void {
    this.activeStep = this.stepState.activeStep;
    this.stepSub = this.stepState.activeStep$.subscribe((step) => {
      this.activeStep = step;
    });
  }

  ngOnDestroy(): void {
    this.stepSub?.unsubscribe();
  }

  goToStep(stepIndex: number): void {
    this.stepState.setActiveStep(stepIndex);
    if (!this.isStudyRoute) {
      this.router.navigate(['/estudo']);
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }
}
