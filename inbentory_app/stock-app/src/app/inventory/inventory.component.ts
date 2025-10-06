import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.services';
import { InventoryService } from '../services/inventory.service'; // サービスのパスに注意
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../dialog/item.dialog.component';
import { UserItemDialogComponent } from '../dialog/user.item.dialog.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [CommonModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule


    ],
    providers: [InventoryService],

    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
    inventories: any[] = [];
    dataSource: any[] = [];
    displayedColumns: string[] = ['id', 'name', 'quantity'];
    userRole: string = ''; // ← ロール表示用


    constructor(private inventoryService: InventoryService,
        private authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object

    ) { }

   ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const user = localStorage.getItem('user'); // ログイン時に保存したユーザー情報

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
  }

  this.userRole = this.authService.getRole();
  this.loadInventories();
}

 loadInventories() {
  this.inventoryService.getInventories().subscribe((data: any[]) => {
    const sorted = data.sort((a, b) => a.id - b.id); // ← ID順に並び替え
    this.inventories = sorted;
    this.dataSource = sorted;
  });
}


   openAddDialog() {
  const dialogRef = this.dialog.open(ItemDialogComponent);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.inventoryService.addInventory(result).subscribe(() => {
        this.loadInventories();
      });
    }
  });
}

openDialog(row: any) {
  const dialogRef = this.dialog.open(UserItemDialogComponent, {
    data: { ...row }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result.quantity >= 0) {
      // サーバーに在庫数を更新
      this.inventoryService.updateInventory(result.id, result).subscribe((updated) => {
        this.loadInventories();
      });
    }
  });
}

    logout() {
        console.log('ログアウト処理');
        this.authService.logout(); 
    }
}