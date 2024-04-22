import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getCategories = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Categories, req, res);
};

export const getCategory = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Categories, req, res);
};

export const createCategory = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Categories, req, res);
};

export const updateCategory = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Categories, req, res);
};

export const deleteCategory = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Categories, req, res);
};
