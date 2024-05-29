import ENTITIES from "../model/enity.model.js";
import CONTROLLER_SERVICE from "../service/controller.service.js";

export const getDecors = (req, res) => {
    CONTROLLER_SERVICE.getAll(ENTITIES.Decors_View, req, res);
};

export const getDecor = (req, res) => {
    CONTROLLER_SERVICE.getItem(ENTITIES.Decors_View, req, res);
};

// export const getDecorByCategory = (req, res) => {
//     CONTROLLER_SERVICE.getDecorByCategory(ENTITIES.Decors_View, req, res);
// };

export const createDecor = (req, res) => {
    CONTROLLER_SERVICE.createItem(ENTITIES.Decors, req, res);
};

export const updateDecor = (req, res) => {
    CONTROLLER_SERVICE.updateItem(ENTITIES.Decors, req, res);
};

export const deleteDecor = (req, res) => {
    CONTROLLER_SERVICE.deleteItem(ENTITIES.Decors, req, res);
};
