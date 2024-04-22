import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getAdmins = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Admins, req, res);
};

export const getAdmin = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Admins, req, res);
};

export const createAdmin = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Admins, req, res);
};

export const updateAdmin = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Admins, req, res);
};

export const deleteAdmin = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Admins, req, res);
};
