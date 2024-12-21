'use client';

export class Repository<T extends { _id: string }> {
  protected items: Map<string, T> = new Map();

  public add(obj: T): void {
    if (!obj._id) {
      throw new Error('Object must have an _id property');
    }
    this.items.set(obj._id, obj);
  }

  public get(id: string): T | undefined {
    return this.items.get(id);
  }

  public remove(id: string): void {
    this.items.delete(id);
  }

  public getAll(): T[] {
    return Array.from(this.items.values());
  }
}
