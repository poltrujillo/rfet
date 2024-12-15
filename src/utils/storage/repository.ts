export class Repository<T extends { id: string }> {
  private _store: Map<string, T> = new Map();

  public add(obj: T): void {
    if (this._store.has(obj.id)) {
      throw new Error(`Object with ID ${obj.id} already exists.`);
    }
    this._store.set(obj.id, obj);
  }

  public get(id: string): T | undefined {
    return this._store.get(id);
  }

  public remove(id: string): void {
    if (!this._store.has(id)) {
      throw new Error(`Object with ID ${id} does not exist.`);
    }
    this._store.delete(id);
  }

  public has(id: string): boolean {
    return this._store.has(id);
  }

  public getAll(): T[] {
    return Array.from(this._store.values());
  }
}
