import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/navbar/sidebar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    NzIconModule,
    FormsModule,
  ],
  standalone: true,
})
export class AppComponent {
  title = 'MaxViable';
  showSupportPanel = false;
  isSupportPinned = false;
  supportTitle = '';
  supportDescription = '';
  supportFileName = '';
  supportFeedback = '';
  private closeSupportTimeout?: ReturnType<typeof setTimeout>;

  openSupportPanel(): void {
    if (this.closeSupportTimeout) {
      clearTimeout(this.closeSupportTimeout);
    }

    this.showSupportPanel = true;
  }

  closeSupportPanel(): void {
    if (this.isSupportPinned) {
      return;
    }

    this.closeSupportTimeout = setTimeout(() => {
      this.showSupportPanel = false;
    }, 240);
  }

  toggleSupportPanel(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isSupportPinned = !this.isSupportPinned;
    this.showSupportPanel = this.isSupportPinned || !this.showSupportPanel;
  }

  onSupportFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.supportFileName = input.files?.[0]?.name ?? '';
  }

  sendSupport(): void {
    if (!this.supportTitle.trim() || !this.supportDescription.trim()) {
      this.supportFeedback = 'Preencha título e descrição.';
      return;
    }

    this.supportFeedback = 'Enviado com sucesso.';
    this.supportTitle = '';
    this.supportDescription = '';
    this.supportFileName = '';
  }
}
