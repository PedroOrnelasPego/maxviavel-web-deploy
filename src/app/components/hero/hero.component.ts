import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCardComponent } from './action-card.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ActionCardComponent],
  template: `
    <section class="hero">
      <div class="logo">
        <!-- optional logo area -->
        <img src="/assets/logo.png" alt="logo" *ngIf="false" />
      </div>
      <h1>Bem-vindo ao MaxViabil</h1>
      <p class="subtitle">O que você deseja hoje?</p>

      <div class="cards">
        <app-action-card
          title="Quero criar um estudo"
          icon="🧩"
          (select)="create.emit()"
        ></app-action-card>
        <app-action-card
          title="Quero consultar um estudo"
          icon="🔎"
          (select)="consult.emit()"
        ></app-action-card>
        <app-action-card
          title="Quero aprovar um estudo"
          icon="✅"
          (select)="approve.emit()"
        ></app-action-card>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 28px;
        text-align: center;
        background: transparent;
      }
      h1 {
        margin: 0;
        color: #0f1724;
      }
      .subtitle {
        color: #6b7280;
        margin: 8px 0 18px;
      }
      .cards {
        display: flex;
        gap: 16px;
        justify-content: center;
      }
    `,
  ],
})
export class HeroComponent {
  @Output() create = new EventEmitter<void>();
  @Output() consult = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();
}
