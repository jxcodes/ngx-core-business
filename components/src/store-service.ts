export abstract class StoreService {

  protected static getApiUrl(): string {
    return 'http://localhost:3000';
  }
  get(id: string): any {
    return null;
  }
  list(): any {
    return null;
  }
  create(data: any): any {
    return null;
  }
  update(id: string, data: any): any {
    return null;
  }
  delete(id: string): any {
    return null;
  }
}
