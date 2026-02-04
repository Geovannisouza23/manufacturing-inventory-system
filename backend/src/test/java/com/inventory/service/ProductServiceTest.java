package com.inventory.service;

import com.inventory.dto.ProductDTO;
import com.inventory.entity.Product;
import com.inventory.repository.ProductMaterialRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.RawMaterialRepository;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class ProductServiceTest {

    @Inject
    ProductService productService;

    @Inject
    ProductRepository productRepository;

    @Test
    @Transactional
    public void testCreateProduct() {
        ProductDTO dto = new ProductDTO();
        dto.setCode("TEST001");
        dto.setName("Test Product");
        dto.setValue(new BigDecimal("100.00"));

        ProductDTO created = productService.create(dto);

        assertNotNull(created.getId());
        assertEquals("TEST001", created.getCode());
        assertEquals("Test Product", created.getName());
        assertEquals(new BigDecimal("100.00"), created.getValue());
    }

    @Test
    @Transactional
    public void testFindAllProducts() {
        Product product = new Product("TEST002", "Test Product 2", new BigDecimal("200.00"));
        productRepository.persist(product);

        List<ProductDTO> products = productService.findAll();

        assertFalse(products.isEmpty());
        assertTrue(products.stream().anyMatch(p -> "TEST002".equals(p.getCode())));
    }

    @Test
    @Transactional
    public void testUpdateProduct() {
        Product product = new Product("TEST003", "Test Product 3", new BigDecimal("300.00"));
        productRepository.persist(product);

        ProductDTO dto = new ProductDTO();
        dto.setCode("TEST003");
        dto.setName("Updated Product");
        dto.setValue(new BigDecimal("350.00"));

        ProductDTO updated = productService.update(product.getId(), dto);

        assertEquals("Updated Product", updated.getName());
        assertEquals(new BigDecimal("350.00"), updated.getValue());
    }

    @Test
    @Transactional
    public void testDeleteProduct() {
        Product product = new Product("TEST004", "Test Product 4", new BigDecimal("400.00"));
        productRepository.persist(product);

        Long productId = product.getId();
        productService.delete(productId);

        assertThrows(NotFoundException.class, () -> productService.findById(productId));
    }
}
