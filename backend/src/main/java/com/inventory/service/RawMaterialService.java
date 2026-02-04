package com.inventory.service;

import com.inventory.dto.RawMaterialDTO;
import com.inventory.entity.RawMaterial;
import com.inventory.repository.RawMaterialRepository;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.WebApplicationException;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class RawMaterialService {

    @Inject
    RawMaterialRepository rawMaterialRepository;

    public List<RawMaterialDTO> findAll() {
        return rawMaterialRepository.listAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public RawMaterialDTO findById(Long id) {
        RawMaterial material = rawMaterialRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Raw material not found with id: " + id));
        return toDTO(material);
    }

    @Transactional
    public RawMaterialDTO create(RawMaterialDTO dto) {
        if (rawMaterialRepository.existsByCode(dto.getCode())) {
            throw new WebApplicationException("Raw material with code " + dto.getCode() + " already exists", 409);
        }

        RawMaterial material = new RawMaterial();
        material.setCode(dto.getCode());
        material.setName(dto.getName());
        material.setStockQuantity(dto.getStockQuantity());

        rawMaterialRepository.persist(material);

        return toDTO(material);
    }

    @Transactional
    public RawMaterialDTO update(Long id, RawMaterialDTO dto) {
        RawMaterial material = rawMaterialRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Raw material not found with id: " + id));

        // Check if code is being changed and if it conflicts
        if (!material.getCode().equals(dto.getCode()) && rawMaterialRepository.existsByCode(dto.getCode())) {
            throw new WebApplicationException("Raw material with code " + dto.getCode() + " already exists", 409);
        }

        material.setCode(dto.getCode());
        material.setName(dto.getName());
        material.setStockQuantity(dto.getStockQuantity());

        return toDTO(material);
    }

    @Transactional
    public void delete(Long id) {
        RawMaterial material = rawMaterialRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Raw material not found with id: " + id));
        rawMaterialRepository.delete(material);
    }

    private RawMaterialDTO toDTO(RawMaterial material) {
        return new RawMaterialDTO(
                material.getId(),
                material.getCode(),
                material.getName(),
                material.getStockQuantity()
        );
    }
}
