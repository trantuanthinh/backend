import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getInventories = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Inventories, req, res);
};

export const getInventory = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Inventories, req, res);
};

export const createInventory = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Inventories, req, res);
};

export const updateInventory = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Inventories, req, res);
};

export const deleteInventory = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Inventories, req, res);
};
