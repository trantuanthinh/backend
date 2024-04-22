import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getCustomers = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Customers, req, res);
};

export const getCustomer = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Customers, req, res);
};

export const createCustomer = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Customers, req, res);
};

export const updateCustomer = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Customers, req, res);
};

export const deleteCustomer = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Customers, req, res);
};
