import { onMount } from "svelte";

export class LocalStorage<T> {
  private data = $state<T>();
  #key: string;
  #initialValue: T;

  constructor(key: string, initialValue: T) {
    this.#key = key;
    this.#initialValue = initialValue;

    onMount(() => {
      if (typeof localStorage !== 'undefined') {
        const storedValue = localStorage.getItem(this.#key);
        this.data = storedValue ? JSON.parse(storedValue) : this.#initialValue;
      }
    });

    $effect(() => {
      if (this.data !== undefined) {
        localStorage.setItem(this.#key, JSON.stringify(this.data));
      }
    });

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === this.#key && e.newValue) {
        this.data = JSON.parse(e.newValue);
      }
    };

    $effect(() => {
      window.addEventListener('storage', handleStorageEvent);
      return () => window.removeEventListener('storage', handleStorageEvent);
    });
  }

  get current(): T {
    // Return the data if it exists, otherwise return the initial value
    return this.data ?? this.#initialValue;
  }

  set current(value: T) {
    this.data = value;
  }
}