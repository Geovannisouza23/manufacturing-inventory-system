package com.inventory.service;

import com.inventory.dto.ProductDTO;
import com.inventory.dto.ProductMaterialDTO;
import com.inventory.entity.Product;
import com.inventory.entity.ProductMaterial;
import com.inventory.entity.RawMaterial;
import com.inventory.repository.ProductMaterialRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.RawMaterialRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.WebApplicationException;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductService {

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository rawMaterialRepository;

    @Inject
    ProductMaterialRepository productMaterialRepository;

    public List<ProductDTO> findAll() {
        return productRepository.listAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO findById(Long id) {
        Product product = productRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));
        return toDTO(product);
    }

    @Transactional
    public ProductDTO create(ProductDTO dto) {
        if (productRepository.existsByCode(dto.getCode())) {
            throw new WebApplicationException("Product with code " + dto.getCode() + " already exists", 409);
        }

        Product product = new Product();
        product.setCode(dto.getCode());
        product.setName(dto.getName());
        product.setValue(dto.getValue());

        productRepository.persist(product);

        // Add materials if provided
        if (dto.getMaterials() != null && !dto.getMaterials().isEmpty()) {
            for (ProductMaterialDTO materialDTO : dto.getMaterials()) {
                RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(materialDTO.getRawMaterialId())
                        .orElseThrow(() -> new NotFoundException("Raw material not found with id: " + materialDTO.getRawMaterialId()));

                ProductMaterial productMaterial = new ProductMaterial();
                productMaterial.setProduct(product);
                productMaterial.setRawMaterial(rawMaterial);
                productMaterial.setQuantityRequired(materialDTO.getQuantityRequired());

                product.addMaterial(productMaterial);
            }
        }

        return toDTO(product);
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO dto) {
        Product product = productRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));

        // Check if code is being changed and if it conflicts
        if (!product.getCode().equals(dto.getCode()) && productRepository.existsByCode(dto.getCode())) {
            throw new WebApplicationException("Product with code " + dto.getCode() + " already exists", 409);
        }

        product.setCode(dto.getCode());
        product.setName(dto.getName());
        product.setValue(dto.getValue());

        // Update materials
        product.getMaterials().clear();
        if (dto.getMaterials() != null) {
            for (ProductMaterialDTO materialDTO : dto.getMaterials()) {
                RawMaterial rawMaterial = rawMaterialRepository.findByIdOptional(materialDTO.getRawMaterialId())
                        .orElseThrow(() -> new NotFoundException("Raw material not found with id: " + materialDTO.getRawMaterialId()));

                ProductMaterial productMaterial = new ProductMaterial();
                productMaterial.setProduct(product);
                productMaterial.setRawMaterial(rawMaterial);
                productMaterial.setQuantityRequired(materialDTO.getQuantityRequired());

                product.addMaterial(productMaterial);
            }
        }

        return toDTO(product);
    }

    @Transactional
    public void delete(Long id) {
        Product product = productRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }

    private ProductDTO toDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setCode(product.getCode());
        dto.setName(product.getName());
        dto.setValue(product.getValue());

        if (product.getMaterials() != null) {
            dto.setMaterials(
                    product.getMaterials().stream()
                            .map(this::toMaterialDTO)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }

    private ProductMaterialDTO toMaterialDTO(ProductMaterial pm) {
        ProductMaterialDTO dto = new ProductMaterialDTO();
        dto.setId(pm.getId());
        dto.setRawMaterialId(pm.getRawMaterial().getId());
        dto.setRawMaterialCode(pm.getRawMaterial().getCode());
        dto.setRawMaterialName(pm.getRawMaterial().getName());
        dto.setQuantityRequired(pm.getQuantityRequired());
        return dto;
    }
}
