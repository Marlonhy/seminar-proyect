import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ready() {
    if (!this._storage) {
      await this.init();
    }
  }
  public async set(key: string, value: any) {
    await this.ready();
    return this._storage?.set(key, value);
  }

  public async get(key: string) {
    await this.ready();
    return this._storage?.get(key);
  }

  public async remove(key: string) {
    await this.ready();
    return this._storage?.remove(key);
  }
  
  public async clear() {
    await this.ready();
    return this._storage?.clear();
  }

  public async keys() {
    await this.ready();
    return this._storage?.keys();
  }

  public async length() {
    await this.ready();
    return this._storage?.length();
  }

  async getFavorites(): Promise<any[]> {
    return (await this.get('favorites')) || [];
  }

  async addFavorite(song: any): Promise<void> {
      const favorites = await this.getFavorites();
      const exists = favorites.find(item => item.id === song.id);

      if (!exists) {
          favorites.push(song);
          await this.set('favorites', favorites);
      }
  }

  async removeFavorite(songId: string): Promise<void> {
      const favorites = await this.getFavorites();
      const updated = favorites.filter(song => song.id !== songId);
      await this.set('favorites', updated);
  }

  async isFavorite(songId: string): Promise<boolean> {
      const favorites = await this.getFavorites();
      return favorites.some(song => song.id === songId);
  }
}
