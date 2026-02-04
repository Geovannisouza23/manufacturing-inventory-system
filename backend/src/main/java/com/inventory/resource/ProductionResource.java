package com.inventory.resource;

import com.inventory.dto.ProductionReportDTO;
import com.inventory.service.ProductionService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/production")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionResource {

    @Inject
    ProductionService productionService;

    @GET
    @Path("/calculate")
    public ProductionReportDTO calculateProduction() {
        return productionService.calculateProducibleProducts();
    }
}
