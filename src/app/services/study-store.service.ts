import { Injectable } from '@angular/core';

export type StudyType = 'urbanismo' | 'incorporacao';
export type StudyStatus =
  | 'rascunho'
  | 'concluido'
  | 'parecer-emitido'
  | 'aprovado'
  | 'excluido';

export interface StudyInput {
  name: string;
  description: string;
  startDate: string;
  identifier: string;
  stateId: number | null;
  stateName: string;
  cityId: number | null;
  cityName: string;
  type: StudyType;
}

export interface StudyItem extends StudyInput {
  id: string;
  createdAt: string;
  status: StudyStatus;
}

@Injectable({
  providedIn: 'root',
})
export class StudyStoreService {
  private readonly storageKey = 'maxviable.studies.v1';

  list(): StudyItem[] {
    const all = this.readAll().map((study) => this.normalizeStudy(study));
    return [...all].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  create(input: StudyInput): StudyItem {
    const study: StudyItem = {
      ...input,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      status: 'rascunho',
    };

    const all = this.readAll();
    all.push(study);
    this.writeAll(all);
    return study;
  }

  remove(studyId: string): void {
    const all = this.readAll();
    const updated = all.filter((study) => study.id !== studyId);
    this.writeAll(updated);
  }

  private readAll(): StudyItem[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as StudyItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private writeAll(studies: StudyItem[]): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(studies));
  }

  private normalizeStudy(study: StudyItem): StudyItem {
    return {
      ...study,
      status: study.status ?? 'rascunho',
    };
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
