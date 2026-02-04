package com.inventory.dto;

import java.math.BigDecimal;

public class ProducibleProductDTO {
    private Long productId;
    private String productCode;
    private String productName;
    private BigDecimal productValue;
    private Integer maxQuantity;
    private BigDecimal totalValue;

    public ProducibleProductDTO() {
    }

    public ProducibleProductDTO(Long productId, String productCode, String productName,
                                BigDecimal productValue, Integer maxQuantity, BigDecimal totalValue) {
        this.productId = productId;
        this.productCode = productCode;
        this.productName = productName;
        this.productValue = productValue;
        this.maxQuantity = maxQuantity;
        this.totalValue = totalValue;
    }

    // Getters and Setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getProductValue() {
        return productValue;
    }

    public void setProductValue(BigDecimal productValue) {
        this.productValue = productValue;
    }

    public Integer getMaxQuantity() {
        return maxQuantity;
    }

    public void setMaxQuantity(Integer maxQuantity) {
        this.maxQuantity = maxQuantity;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }
}
