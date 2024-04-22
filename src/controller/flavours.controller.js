import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getFlavours = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Flavours, req, res);
};

export const getFlavour = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Flavours, req, res);
};

export const createFlavour = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Flavours, req, res);
};

export const updateFlavour = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Flavours, req, res);
};

export const deleteFlavour = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Flavours, req, res);
};
