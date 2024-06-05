import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getDes_Products = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Des_Products_View, req, res);
};

export const getDes_Product = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Des_Products_View, req, res);
};

export const getLastDes_Product = (req, res) => {
    CONTROLLER_SERVICE.getLastItem(ENTITIES.Des_Products, req, res);
};

export const createDes_Product = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Des_Products, req, res);
};

export const updateDes_Product = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Des_Products, req, res);
};

export const deleteDes_Product = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Des_Products, req, res);
};
