package com.inventory.resource;

import com.inventory.dto.ProductDTO;
import com.inventory.service.ProductService;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.List;

@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductService productService;

    @GET
    public List<ProductDTO> getAllProducts() {
        return productService.findAll();
    }

    @GET
    @Path("/{id}")
    public ProductDTO getProduct(@PathParam("id") Long id) {
        return productService.findById(id);
    }

    @POST
    public Response createProduct(ProductDTO product) {
        ProductDTO created = productService.create(product);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public ProductDTO updateProduct(@PathParam("id") Long id, ProductDTO product) {
        return productService.update(id, product);
    }

    @DELETE
    @Path("/{id}")
    public Response deleteProduct(@PathParam("id") Long id) {
        productService.delete(id);
        return Response.noContent().build();
    }
}
