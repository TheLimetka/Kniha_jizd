const carDao = require("../../dao/car-dao.js");
const fs = require("fs");
const path = require("path");

async function getcarRidesAbl(req, res) {
    const id = req.params.id;
    const carName = `${id}.car`;
    const rideListFolder = path.join(__dirname, "../../dao/storage/rideList");

    try {
        const files = await fs.promises.readdir(rideListFolder);
        const matchingFiles = files.filter(file => {
            return file.endsWith(".json") && file.includes(carName);
        });

        // Do something with the matching files
        console.log(matchingFiles);

        // Send response
        res.status(200).json(matchingFiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = getcarRidesAbl;