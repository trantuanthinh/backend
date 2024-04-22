import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getOrder_Details = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Order_Details, req, res);
};

export const getOrder_Detail = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Order_Details, req, res);
};

export const createOrder_Detail = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Order_Details, req, res);
};

export const updateOrder_Detail = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Order_Details, req, res);
};

export const deleteOrder_Detail = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Order_Details, req, res);
};
