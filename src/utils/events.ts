type EventCallback = () => void;

class EventEmitter {
  private listeners: EventCallback[] = [];

  public subscribe(callback: EventCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  public emit(): void {
    this.listeners.forEach((callback) => callback());
  }
}

export const tournamentChanges = new EventEmitter();
