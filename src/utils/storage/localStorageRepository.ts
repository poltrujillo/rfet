'use client';

import { Repository } from './repository';

export class LocalStorageRepository<
  T extends { _id: string }
> extends Repository<T> {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    super();
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const items = JSON.parse(data) as T[];
        this.items.clear(); // Clear existing items first
        items.forEach((item) => {
          if (item._id) {
            this.items.set(item._id, item);
          }
        });
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      const items = Array.from(this.items.values());
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
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
