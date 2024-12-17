type Listener = () => void;

export class EventEmitter {
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public emit() {
    this.listeners.forEach((listener) => listener());
  }
}

export const tournamentChanges = new EventEmitter();
