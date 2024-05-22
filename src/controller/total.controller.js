import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getTotals = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Total, req, res);
};

export const getTotal = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Total, req, res);
};

export const createTotal = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Total, req, res);
};

export const updateTotal = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Total, req, res);
};

export const deleteTotal = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Total, req, res);
};
