package com.inventory.resource;

import com.inventory.dto.RawMaterialDTO;
import com.inventory.service.RawMaterialService;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.List;

@Path("/api/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @Inject
    RawMaterialService rawMaterialService;

    @GET
    public List<RawMaterialDTO> getAllRawMaterials() {
        return rawMaterialService.findAll();
    }

    @GET
    @Path("/{id}")
    public RawMaterialDTO getRawMaterial(@PathParam("id") Long id) {
        return rawMaterialService.findById(id);
    }

    @POST
    public Response createRawMaterial(RawMaterialDTO material) {
        RawMaterialDTO created = rawMaterialService.create(material);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public RawMaterialDTO updateRawMaterial(@PathParam("id") Long id, RawMaterialDTO material) {
        return rawMaterialService.update(id, material);
    }

    @DELETE
    @Path("/{id}")
    public Response deleteRawMaterial(@PathParam("id") Long id) {
        rawMaterialService.delete(id);
        return Response.noContent().build();
    }
}
