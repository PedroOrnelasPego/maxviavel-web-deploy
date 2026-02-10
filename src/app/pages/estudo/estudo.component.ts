import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { Chart, registerables } from 'chart.js';
import { StepStateService } from '../../services/step-state.service';

@Component({
  selector: 'app-estudo',
  standalone: true,
  imports: [CommonModule, RouterModule, StepperComponent],
  templateUrl: './estudo.component.html',
  styleUrls: ['./estudo.component.scss'],
})
export class EstudoComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('salesChart') salesChartRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueChart') revenueChartRef?: ElementRef<HTMLCanvasElement>;

  steps = [
    { title: 'Identificacao do projeto', subtitle: 'Dados iniciais' },
    { title: 'Cenarios', subtitle: 'Premissas' },
    { title: 'Orcamento de obras', subtitle: 'Custos diretos' },
    { title: 'Negociacao de terreno', subtitle: 'Ajustes' },
    { title: 'Estruturacao da receita', subtitle: 'Precos e vendas' },
    { title: 'Estruturacao das despesas e custos', subtitle: 'Operacao' },
    { title: 'Estruturacao das fontes de recursos', subtitle: 'Financiamento' },
    { title: 'Sensibilidade de riscos', subtitle: 'Cenarios' },
    { title: 'Resultado', subtitle: 'Resumo final' },
  ];
  active = 0;
  showInsights = true;

  private salesChart?: Chart;
  private revenueChart?: Chart;
  private stepSub?: Subscription;

  constructor(private stepState: StepStateService) {}

  ngOnInit(): void {
    this.active = this.stepState.activeStep;
    this.stepSub = this.stepState.activeStep$.subscribe((step) => {
      this.active = step;
    });
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);

    const salesCtx = this.salesChartRef?.nativeElement.getContext('2d');
    if (salesCtx) {
      this.salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
          labels: ['MAR/27', 'DEZ/27', 'SET/28', 'SET/29'],
          datasets: [
            {
              label: 'Acumulado',
              data: [12, 38, 62, 78],
              borderColor: '#0f9f9b',
              backgroundColor: 'rgba(15, 159, 155, 0.2)',
              fill: true,
              tension: 0.35,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          animation: false,
          normalized: true,
          events: [],
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, offset: false },
            y: {
              min: 0,
              max: 100,
              ticks: { stepSize: 20 },
              grid: { color: 'rgba(15, 23, 36, 0.08)' },
            },
          },
        },
      });
    }

    const revenueCtx = this.revenueChartRef?.nativeElement.getContext('2d');
    if (revenueCtx) {
      this.revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
          labels: ['A', 'B', 'C', 'D'],
          datasets: [
            {
              label: 'Receita',
              data: [18, 26, 14, 22],
              backgroundColor: '#0b5ea8',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          animation: false,
          normalized: true,
          events: [],
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, offset: false },
            y: {
              min: 0,
              max: 40,
              ticks: { stepSize: 10 },
              grid: { color: 'rgba(15, 23, 36, 0.08)' },
            },
          },
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.salesChart?.destroy();
    this.revenueChart?.destroy();
    this.stepSub?.unsubscribe();
  }

  toggleInsights(): void {
    this.showInsights = !this.showInsights;
  }

  onStepChange(stepIndex: number): void {
    this.active = stepIndex;
    this.stepState.setActiveStep(stepIndex);
  }
}
