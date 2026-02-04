package com.inventory.resource;

import com.inventory.dto.ProductionReportDTO;
import com.inventory.service.ProductionService;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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
