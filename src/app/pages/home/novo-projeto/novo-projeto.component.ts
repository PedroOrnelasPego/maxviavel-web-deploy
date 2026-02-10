import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IbgeLocalidadesService,
  IbgeState,
  IbgeCity,
} from '../../../services/ibge-localidades.service';

@Component({
  selector: 'app-novo-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss'],
})
export class NovoProjetoComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  states: IbgeState[] = [];
  cities: IbgeCity[] = [];
  selectedStateId: number | null = null;
  selectedCityId: number | null = null;
  selectedType: 'urbanismo' | 'incorporacao' | null = 'urbanismo';
  loadingCities = false;

  constructor(private ibge: IbgeLocalidadesService) {}

  ngOnInit(): void {
    this.ibge.getStates().subscribe((states) => {
      this.states = states;
    });
  }

  onStateChange(stateId: number | null): void {
    this.selectedCityId = null;
    this.cities = [];

    if (!stateId) {
      return;
    }

    this.loadingCities = true;
    this.ibge.getCitiesByState(stateId).subscribe((cities) => {
      this.cities = cities;
      this.loadingCities = false;
    });
  }

  setType(type: 'urbanismo' | 'incorporacao'): void {
    this.selectedType = type;
  }
}
