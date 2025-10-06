import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  
  private mockData = {
    inventories: [
      { id: 1, name: 'ノートPC', category: 'Electronics', quantity: 10, price: 50000 },
      { id: 2, name: 'マウス', category: 'Electronics', quantity: 25, price: 2000 },
      { id: 3, name: 'キーボード', category: 'Electronics', quantity: 15, price: 5000 },
      { id: 4, name: 'モニター', category: 'Electronics', quantity: 8, price: 30000 }
    ],
    users: [
      { id: 1, email: 'admin@example.com', role: 'admin' },
      { id: 2, email: 'user@example.com', role: 'user' }
    ]
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // APIリクエストをモックに置き換える
    if (req.url.includes('/api/')) {
      
      // ログインAPI
      if (req.url.includes('/api/auth/login') && req.method === 'POST') {
        const { email, password } = req.body;
        if (email === 'admin@example.com' && password === 'admin') {
          return of(new HttpResponse({
            status: 200,
            body: { token: 'mock-admin-token', role: 'admin', email: email }
          })).pipe(delay(500));
        } else if (email === 'user@example.com' && password === 'user') {
          return of(new HttpResponse({
            status: 200,
            body: { token: 'mock-user-token', role: 'user', email: email }
          })).pipe(delay(500));
        } else {
          return of(new HttpResponse({
            status: 401,
            body: { error: 'Invalid credentials' }
          })).pipe(delay(500));
        }
      }

      // インベントリ取得API
      if (req.url.includes('/api/inventory') && req.method === 'GET') {
        return of(new HttpResponse({
          status: 200,
          body: this.mockData.inventories
        })).pipe(delay(300));
      }

      // インベントリ追加API
      if (req.url.includes('/api/inventory') && req.method === 'POST') {
        const newItem = { ...req.body, id: this.mockData.inventories.length + 1 };
        this.mockData.inventories.push(newItem);
        return of(new HttpResponse({
          status: 201,
          body: newItem
        })).pipe(delay(300));
      }

      // インベントリ更新API
      if (req.url.includes('/api/inventory/') && req.method === 'PUT') {
        const id = parseInt(req.url.split('/').pop() || '0');
        const index = this.mockData.inventories.findIndex(item => item.id === id);
        if (index >= 0) {
          this.mockData.inventories[index] = { ...req.body, id };
          return of(new HttpResponse({
            status: 200,
            body: this.mockData.inventories[index]
          })).pipe(delay(300));
        }
      }

      // インベントリ削除API
      if (req.url.includes('/api/inventory/') && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/').pop() || '0');
        const index = this.mockData.inventories.findIndex(item => item.id === id);
        if (index >= 0) {
          this.mockData.inventories.splice(index, 1);
          return of(new HttpResponse({
            status: 204,
            body: null
          })).pipe(delay(300));
        }
      }
    }

    // 通常のAPIリクエストはそのまま処理
    return next.handle(req);
  }
}