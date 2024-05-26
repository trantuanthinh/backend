import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getOrders = (req, res) => {
    CONTROLLER_SERVICE.getOrders(ENTITIES.Orders_View, req, res);
};

export const getOrder = (req, res) => {
    CONTROLLER_SERVICE.getOrder(ENTITIES.Orders_View, req, res);
};

export const createOrder = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Orders, req, res);
};

export const updateOrder = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Orders, req, res);
};

export const deleteOrder = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Orders, req, res);
};
