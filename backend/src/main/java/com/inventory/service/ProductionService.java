package com.inventory.service;

import com.inventory.dto.ProducibleProductDTO;
import com.inventory.dto.ProductionReportDTO;
import com.inventory.entity.Product;
import com.inventory.entity.ProductMaterial;
import com.inventory.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductionService {

    @Inject
    ProductRepository productRepository;

    public ProductionReportDTO calculateProducibleProducts() {
        List<Product> allProducts = productRepository.listAll();
        
        // Map to track available stock (we'll simulate consumption)
        Map<Long, Integer> availableStock = new HashMap<>();
        
        // Calculate max producible quantity for each product
        List<ProducibleProductDTO> producibleProducts = allProducts.stream()
                .map(product -> calculateMaxQuantity(product, availableStock))
                .filter(dto -> dto.getMaxQuantity() > 0)
                .sorted(Comparator.comparing(ProducibleProductDTO::getProductValue).reversed())
                .collect(Collectors.toList());

        // Now allocate stock based on priority (highest value first)
        List<ProducibleProductDTO> finalProducibleProducts = new ArrayList<>();
        Map<Long, Integer> remainingStock = new HashMap<>();
        BigDecimal totalValue = BigDecimal.ZERO;

        for (ProducibleProductDTO dto : producibleProducts) {
            Product product = productRepository.findById(dto.getProductId());
            Integer maxProducible = calculateMaxQuantityWithStock(product, remainingStock);

            if (maxProducible > 0) {
                // Allocate stock
                for (ProductMaterial pm : product.getMaterials()) {
                    Long materialId = pm.getRawMaterial().getId();
                    Integer currentStock = remainingStock.getOrDefault(materialId, 
                            pm.getRawMaterial().getStockQuantity());
                    Integer consumed = maxProducible * pm.getQuantityRequired();
                    remainingStock.put(materialId, currentStock - consumed);
                }

                BigDecimal totalProductValue = dto.getProductValue().multiply(new BigDecimal(maxProducible));
                dto.setMaxQuantity(maxProducible);
                dto.setTotalValue(totalProductValue);
                finalProducibleProducts.add(dto);
                totalValue = totalValue.add(totalProductValue);
            }
        }

        return new ProductionReportDTO(finalProducibleProducts, totalValue);
    }

    private ProducibleProductDTO calculateMaxQuantity(Product product, Map<Long, Integer> stockMap) {
        if (product.getMaterials() == null || product.getMaterials().isEmpty()) {
            return new ProducibleProductDTO(
                    product.getId(),
                    product.getCode(),
                    product.getName(),
                    product.getValue(),
                    0,
                    BigDecimal.ZERO
            );
        }

        Integer maxQuantity = Integer.MAX_VALUE;

        for (ProductMaterial pm : product.getMaterials()) {
            Integer availableStock = stockMap.getOrDefault(
                    pm.getRawMaterial().getId(),
                    pm.getRawMaterial().getStockQuantity()
            );
            Integer possibleQuantity = availableStock / pm.getQuantityRequired();
            maxQuantity = Math.min(maxQuantity, possibleQuantity);
        }

        if (maxQuantity == Integer.MAX_VALUE) {
            maxQuantity = 0;
        }

        return new ProducibleProductDTO(
                product.getId(),
                product.getCode(),
                product.getName(),
                product.getValue(),
                maxQuantity,
                product.getValue().multiply(new BigDecimal(maxQuantity))
        );
    }

    private Integer calculateMaxQuantityWithStock(Product product, Map<Long, Integer> remainingStock) {
        if (product.getMaterials() == null || product.getMaterials().isEmpty()) {
            return 0;
        }

        Integer maxQuantity = Integer.MAX_VALUE;

        for (ProductMaterial pm : product.getMaterials()) {
            Integer availableStock = remainingStock.getOrDefault(
                    pm.getRawMaterial().getId(),
                    pm.getRawMaterial().getStockQuantity()
            );
            Integer possibleQuantity = availableStock / pm.getQuantityRequired();
            maxQuantity = Math.min(maxQuantity, possibleQuantity);
        }

        if (maxQuantity == Integer.MAX_VALUE) {
            maxQuantity = 0;
        }

        return maxQuantity;
    }
}
