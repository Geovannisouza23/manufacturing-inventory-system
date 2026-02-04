package com.inventory.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal value;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ProductMaterial> materials = new ArrayList<>();

    public Product() {
    }

    public Product(String code, String name, BigDecimal value) {
        this.code = code;
        this.name = name;
        this.value = value;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public List<ProductMaterial> getMaterials() {
        return materials;
    }

    public void setMaterials(List<ProductMaterial> materials) {
        this.materials = materials;
    }

    public void addMaterial(ProductMaterial material) {
        materials.add(material);
        material.setProduct(this);
    }

    public void removeMaterial(ProductMaterial material) {
        materials.remove(material);
        material.setProduct(null);
    }
}
