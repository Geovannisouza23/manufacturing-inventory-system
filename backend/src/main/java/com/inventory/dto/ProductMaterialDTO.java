package com.inventory.dto;

public class ProductMaterialDTO {
    private Long id;
    private Long rawMaterialId;
    private String rawMaterialCode;
    private String rawMaterialName;
    private Integer quantityRequired;

    public ProductMaterialDTO() {
    }

    public ProductMaterialDTO(Long id, Long rawMaterialId, String rawMaterialCode, 
                             String rawMaterialName, Integer quantityRequired) {
        this.id = id;
        this.rawMaterialId = rawMaterialId;
        this.rawMaterialCode = rawMaterialCode;
        this.rawMaterialName = rawMaterialName;
        this.quantityRequired = quantityRequired;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    public String getRawMaterialCode() {
        return rawMaterialCode;
    }

    public void setRawMaterialCode(String rawMaterialCode) {
        this.rawMaterialCode = rawMaterialCode;
    }

    public String getRawMaterialName() {
        return rawMaterialName;
    }

    public void setRawMaterialName(String rawMaterialName) {
        this.rawMaterialName = rawMaterialName;
    }

    public Integer getQuantityRequired() {
        return quantityRequired;
    }

    public void setQuantityRequired(Integer quantityRequired) {
        this.quantityRequired = quantityRequired;
    }
}
