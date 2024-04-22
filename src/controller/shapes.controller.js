import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getShapes = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Shapes, req, res);
};

export const getShape = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Shapes, req, res);
};

export const createShape = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Shapes, req, res);
};

export const updateShape = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Shapes, req, res);
};

export const deleteShape = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Shapes, req, res);
};
