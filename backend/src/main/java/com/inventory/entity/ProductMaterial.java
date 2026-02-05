package com.inventory.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.persistence.*;

@Entity
@Table(name = "product_materials")
public class ProductMaterial extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "raw_material_id", nullable = false)
    private RawMaterial rawMaterial;

    @Column(nullable = false)
    private Integer quantityRequired;

    public ProductMaterial() {
    }

    public ProductMaterial(Product product, RawMaterial rawMaterial, Integer quantityRequired) {
        this.product = product;
        this.rawMaterial = rawMaterial;
        this.quantityRequired = quantityRequired;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public RawMaterial getRawMaterial() {
        return rawMaterial;
    }

    public void setRawMaterial(RawMaterial rawMaterial) {
        this.rawMaterial = rawMaterial;
    }

    public Integer getQuantityRequired() {
        return quantityRequired;
    }

    public void setQuantityRequired(Integer quantityRequired) {
        this.quantityRequired = quantityRequired;
    }
}
