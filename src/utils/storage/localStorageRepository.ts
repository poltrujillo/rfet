'use client';

import { Repository } from './repository';

export class LocalStorageRepository<
  T extends { id: string }
> extends Repository<T> {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    super();
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      const items = JSON.parse(data) as T[];
      items.forEach((item) => super.add(item));
    }
  }

  private saveToStorage(): void {
    const items = super.getAll();
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  public add(obj: T): void {
    super.add(obj);
    this.saveToStorage();
  }

  public remove(id: string): void {
    super.remove(id);
    this.saveToStorage();
  }
}
