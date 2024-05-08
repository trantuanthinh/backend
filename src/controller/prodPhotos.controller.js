import { readdir, unlink, unlinkSync } from "fs";
import uploadProdFile from "../middleware/uploadsProd.js";

const baseUrl = `http://localhost:3000/api/prod_photo/`;

export const uploadProd = async (req, res) => {
    try {
        await uploadProdFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a product photo!" });
        }
        res.status(200).send({
            message: "Uploaded the product photo successfully: " + req.file.originalname,
        });
    } catch (err) {
        console.log(err);
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "Product photo size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the product photo: ${req.file.originalname}. ${err}`,
        });
    }
};

export const getProdPhotos = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploadsProd/";

    readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan product photos!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

export const getProdPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsProd/";

    res.sendFile(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the product photo. " + err,
            });
        }
    });
};

export const downloadProdPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsProd/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the product photo. " + err,
            });
        }
    });
};

export const removeProdPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsProd/";

    unlink(directoryPath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete the product photo. " + err,
            });
        }

        res.status(200).send({
            message: "Product photo is deleted.",
        });
    });
};

export const removeSyncProdPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsProd/";

    try {
        unlinkSync(directoryPath + fileName);

        res.status(200).send({
            message: "Product photo is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete the product photo. " + err,
        });
    }
};
