import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/navbar/sidebar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, SidebarComponent, NzIconModule],
  standalone: true,
})
export class AppComponent {
  title = 'maxviabil';
}
