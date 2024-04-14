const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const carFolderPath = path.join(__dirname, "storage", "carList");

// Method to read an car from a file
function get(carId) {
  try {
    
    const filePath = path.join(carFolderPath, `${carId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadcar", message: error.message };
  }
}
function getcarRides(carId) {
  try {
    const filePath = path.join(carFolderPath, `${carId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadcar", message: error.message };
  }
}
// Method to write an car to a file
function create(car) {
  try {
    car.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(carFolderPath, `${car.id}.json`);
    const fileData = JSON.stringify(car);
    fs.writeFileSync(filePath, fileData, "utf8");
    return car;
  } catch (error) {
    throw { code: "failedToCreatecar", message: error.message };
  }
}

// Method to update car in a file
function update(car) {
  try {
    const currentcar = get(car.id);
    if (!currentcar) return null;
    const newcar = { ...currentcar, ...car };
    const filePath = path.join(carFolderPath, `${car.id}.json`);
    const fileData = JSON.stringify(newcar);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newcar;
  } catch (error) {
    throw { code: "failedToUpdatecar", message: error.message };
  }
}

// Method to remove an car from a file
function remove(carId) {
  try {
    const filePath = path.join(carFolderPath, `${carId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovecar", message: error.message };
  }
}

// Method to list cars in a folder
function list() {
  try {
    const files = fs.readdirSync(carFolderPath);
    const carList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(carFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return carList;
  } catch (error) {
    throw { code: "failedToListcars", message: error.message };
  }
}

module.exports = {
  get,
  getcarRides,
  create,
  update,
  remove,
  list,
};
