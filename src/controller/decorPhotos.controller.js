import { readdir, unlink, unlinkSync } from "fs";
import uploadDecorFile from "../middleware/uploadsDecor.js";

const baseUrl = "http://localhost:3000/api/decor_photo/";

export const uploadDecor = async (req, res) => {
    try {
        await uploadDecorFile(req, res);

        if (req.file == undefined) {
            return res
                .status(400)
                .send({ message: "Please upload a decor photo!" });
        }

        res.status(200).send({
            message:
                "Uploaded the decor photo successfully: " +
                req.file.originalname,
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "Decor photo size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the decor photo: ${req.file.originalname}. ${err}`,
        });
    }
};

export const getDecorPhotos = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploadsDecor/";

    readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan decor photos!",
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

export const getDecorPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsDecor/";

    res.sendFile(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the decor photo. " + err,
            });
        }
    });
};

export const downloadDecorPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsDecor/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the decor photo. " + err,
            });
        }
    });
};

export const removeDecorPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsDecor/";

    unlink(directoryPath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete the decor photo. " + err,
            });
        }

        res.status(200).send({
            message: "Decor photo is deleted.",
        });
    });
};

export const removeSyncDecorPhoto = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploadsDecor/";

    try {
        unlinkSync(directoryPath + fileName);

        res.status(200).send({
            message: "Decor photo is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete the decor photo. " + err,
        });
    }
};
