import { UUID } from 'crypto';

export class Repository<T extends { id: UUID }> {
  private _store: Map<UUID, T> = new Map();

  public add(obj: T): void {
    if (this._store.has(obj.id)) {
      throw new Error(`Object with ID ${obj.id} already exists.`);
    }
    this._store.set(obj.id, obj);
  }

  public get(id: UUID): T | undefined {
    return this._store.get(id);
  }

  public remove(id: UUID): void {
    if (!this._store.has(id)) {
      throw new Error(`Object with ID ${id} does not exist.`);
    }
    this._store.delete(id);
  }

  public has(id: UUID): boolean {
    return this._store.has(id);
  }

  public getAll(): T[] {
    return Array.from(this._store.values());
  }
}
