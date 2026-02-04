package com.inventory.repository;

import com.inventory.entity.ProductMaterial;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import javax.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class ProductMaterialRepository implements PanacheRepository<ProductMaterial> {

    public List<ProductMaterial> findByProductId(Long productId) {
        return list("product.id", productId);
    }

    public void deleteByProductId(Long productId) {
        delete("product.id", productId);
    }
}
