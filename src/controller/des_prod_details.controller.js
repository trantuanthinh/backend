import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getDes_Products_Details = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Decor_Des_Products_Details, req, res);
};

export const getDes_Product_Details = (req, res) => {
    CONTROLLER_SERVICE.getItemValues(ENTITIES.Decor_Des_Products_Details, req, res);
};

export const getLastDes_Product_Details = (req, res) => {
    CONTROLLER_SERVICE.getLastItem(ENTITIES.Decor_Des_Products_Details, req, res);
};

export const createDes_Product_Details = (req, res) => {
    CONTROLLER_SERVICE.createDecorDesignedProductValues(ENTITIES.Decor_Des_Products_Details, req, res);
};

export const updateDes_Product_Details = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Decor_Des_Products_Details, req, res);
};

export const deleteDes_Product_Details = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Decor_Des_Products_Details, req, res);
};
