import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IbgeLocalidadesService,
  IbgeState,
  IbgeCity,
} from '../../../services/ibge-localidades.service';

export interface NovoProjetoFormValue {
  name: string;
  description: string;
  startDate: string;
  identifier: string;
  stateId: number | null;
  cityId: number | null;
  type: 'urbanismo' | 'incorporacao';
  stateName: string;
  cityName: string;
}

@Component({
  selector: 'app-novo-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss'],
})
export class NovoProjetoComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<NovoProjetoFormValue>();

  states: IbgeState[] = [];
  cities: IbgeCity[] = [];
  projectName = '';
  description = '';
  startDate = '';
  identifier = '';
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

  get canSubmit(): boolean {
    return !!this.projectName.trim() && !!this.selectedType;
  }

  confirmCreate(): void {
    if (!this.canSubmit || !this.selectedType) {
      return;
    }

    const selectedState = this.states.find(
      (state) => state.id === this.selectedStateId,
    );
    const selectedCity = this.cities.find(
      (city) => city.id === this.selectedCityId,
    );

    this.confirm.emit({
      name: this.projectName.trim(),
      description: this.description.trim(),
      startDate: this.startDate,
      identifier: this.identifier.trim(),
      stateId: this.selectedStateId,
      cityId: this.selectedCityId,
      type: this.selectedType,
      stateName: selectedState?.nome ?? '',
      cityName: selectedCity?.nome ?? '',
    });
  }
}
