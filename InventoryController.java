package com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    // 一覧取得
    @GetMapping
    public List<Inventory> getAll() {
        return inventoryRepository.findAll();
    }

    // 追加（POST）
    @PostMapping
public Inventory addInventory(@RequestBody Inventory inventory) {
    System.out.println("受信した商品: " + inventory.getName() + ", 数量: " + inventory.getQuantity());
    return inventoryRepository.save(inventory);
}

    // 更新（PUT）
    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long id, @RequestBody Inventory update) {
        return inventoryRepository.findById(id)
            .map(item -> {
                item.setName(update.getName());
                item.setQuantity(update.getQuantity());
                inventoryRepository.save(item);
                return ResponseEntity.ok(item);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}