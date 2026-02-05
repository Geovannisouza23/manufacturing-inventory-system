package com.inventory.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductionReportDTO {
    private List<ProducibleProductDTO> producibleProducts = new ArrayList<>();
    private BigDecimal totalProductionValue = BigDecimal.ZERO;

    public ProductionReportDTO() {
    }

    public ProductionReportDTO(List<ProducibleProductDTO> producibleProducts, BigDecimal totalProductionValue) {
        this.producibleProducts = producibleProducts;
        this.totalProductionValue = totalProductionValue;
    }

    // Getters and Setters
    public List<ProducibleProductDTO> getProducibleProducts() {
        return producibleProducts;
    }

    public void setProducibleProducts(List<ProducibleProductDTO> producibleProducts) {
        this.producibleProducts = producibleProducts;
    }

    public BigDecimal getTotalProductionValue() {
        return totalProductionValue;
    }

    public void setTotalProductionValue(BigDecimal totalProductionValue) {
        this.totalProductionValue = totalProductionValue;
    }
}
