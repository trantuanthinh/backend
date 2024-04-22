import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getSizes = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Sizes, req, res);
};

export const getSize = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Sizes, req, res);
};

export const createSize = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Sizes, req, res);
};

export const updateSize = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Sizes, req, res);
};

export const deleteSize = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Sizes, req, res);
};
