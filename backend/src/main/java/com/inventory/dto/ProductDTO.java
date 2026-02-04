package com.inventory.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductDTO {
    private Long id;
    private String code;
    private String name;
    private BigDecimal value;
    private List<ProductMaterialDTO> materials = new ArrayList<>();

    public ProductDTO() {
    }

    public ProductDTO(Long id, String code, String name, BigDecimal value) {
        this.id = id;
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

    public List<ProductMaterialDTO> getMaterials() {
        return materials;
    }

    public void setMaterials(List<ProductMaterialDTO> materials) {
        this.materials = materials;
    }
}
