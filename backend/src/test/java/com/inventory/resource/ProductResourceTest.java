package com.inventory.resource;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
public class ProductResourceTest {

    @Test
    public void testGetAllProducts() {
        given()
                .when().get("/api/products")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON);
    }

    @Test
    public void testCreateProduct() {
        String productJson = """
                {
                    "code": "PROD001",
                    "name": "Test Product",
                    "value": 100.50
                }
                """;

        given()
                .contentType(ContentType.JSON)
                .body(productJson)
                .when().post("/api/products")
                .then()
                .statusCode(201)
                .body("id", notNullValue())
                .body("code", is("PROD001"))
                .body("name", is("Test Product"));
    }
}
