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
  template: `
    <div class="wrapper">
      <div class="brand">
        <img class="logo" src="/file.png" alt="MaxViabil" />
        <span>MaxViabil</span>
      </div>
      <button nz-button nzType="primary" (click)="toggleCollapsed()">
        <nz-icon [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"></nz-icon>
      </button>
      <ul
        nz-menu
        nzMode="inline"
        nzTheme="dark"
        [nzInlineCollapsed]="isCollapsed"
        class="menu"
      >
        <li
          nz-menu-item
          nz-tooltip
          nzTooltipPlacement="right"
          [nzTooltipTitle]="isCollapsed ? 'Menu principal' : ''"
          routerLink="/"
          routerLinkActive="ant-menu-item-selected"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <nz-icon nzType="home"></nz-icon>
          <span>Menu principal</span>
        </li>
        <li
          *ngIf="isStudyRoute"
          nz-submenu
          nzTitle="Estudo em andamento"
          nzIcon="profile"
        >
          <ul>
            <li
              *ngFor="let step of steps; let i = index"
              nz-menu-item
              [nzSelected]="activeStep === i"
              (click)="goToStep(i)"
            >
              {{ i + 1 }}. {{ step }}
            </li>
          </ul>
        </li>
        <li
          nz-menu-item
          nz-tooltip
          nzTooltipPlacement="right"
          [nzTooltipTitle]="isCollapsed ? 'Aprova estudo' : ''"
        >
          <nz-icon nzType="check-circle"></nz-icon>
          <span>Aprova estudo</span>
        </li>
        <li
          nz-menu-item
          nz-tooltip
          nzTooltipPlacement="right"
          [nzTooltipTitle]="isCollapsed ? 'FAQ' : ''"
        >
          <nz-icon nzType="question-circle"></nz-icon>
          <span>FAQ</span>
        </li>
        <li
          nz-menu-item
          nz-tooltip
          nzTooltipPlacement="right"
          [nzTooltipTitle]="isCollapsed ? 'Glossario' : ''"
        >
          <nz-icon nzType="book"></nz-icon>
          <span>Glossario</span>
        </li>
        <li
          nz-menu-item
          nz-tooltip
          nzTooltipPlacement="right"
          [nzTooltipTitle]="isCollapsed ? 'Dashboard' : ''"
        >
          <nz-icon nzType="dashboard"></nz-icon>
          <span>Dashboard</span>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 256px;
        transition: width 0.2s ease;
        z-index: 10;
      }
      :host.collapsed {
        width: 80px;
      }
      .wrapper {
        height: 100%;
        width: 100%;
        background: #001529;
        padding: 12px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      :host.collapsed .wrapper {
        padding: 10px 8px;
        align-items: center;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #fff;
        font-weight: 600;
        padding: 6px 4px;
      }
      :host.collapsed .brand {
        width: 100%;
        justify-content: center;
        padding: 6px 0;
      }
      :host.collapsed .brand span {
        display: none;
      }
      .logo {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        object-fit: contain;
        background: transparent;
      }
      button {
        align-self: flex-start;
      }
      :host.collapsed button {
        align-self: center;
      }
      .menu {
        flex: 1;
        overflow: auto;
        border: 0;
        background: transparent;
        width: 100%;
      }
      @media (max-width: 800px) {
        :host {
          width: 100vw;
        }
        :host.collapsed {
          width: 100vw;
        }
      }
    `,
  ],
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
