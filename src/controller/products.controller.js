import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getProducts = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Products_View, req, res);
};

export const getProduct = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Products_View, req, res);
};

export const createProduct = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Products, req, res);
};

export const updateProduct = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Products, req, res);
};

export const deleteProduct = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Products, req, res);
};

export const getProductsByCategoryId = (req, res) => {
    CONTROLLER_SERVICE.getProductsByCategoryId(ENTITIES.Products, req, res);
};
