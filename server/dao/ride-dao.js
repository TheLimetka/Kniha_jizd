const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const rideFolderPath = path.join(__dirname, "storage", "rideList");

// Method to read an ride from a file
function get(rideId) {
  try {
    const filePath = path.join(rideFolderPath, `${rideId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadride", message: error.message };
  }
}

// Method to write an ride to a file
function create(ride) {
  try {
    const id_car = ride.id_car;
    ride.id = `${id_car}_${crypto.randomBytes(16).toString("hex")}`;
    const filePath = path.join(rideFolderPath, `${ride.id}.json`);
    const fileData = JSON.stringify(ride);
    fs.writeFileSync(filePath, fileData, "utf8");
    return ride;
  } catch (error) {
    throw { code: "failedToCreateride", message: error.message };
  }
}

// Method to update ride in a file
function update(ride) {
  try {
    const currentride = get(ride.id);
    if (!currentride) return null;
    const newride = { ...currentride, ...ride };
    const filePath = path.join(rideFolderPath, `${ride.id}.json`);
    const fileData = JSON.stringify(newride);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newride;
  } catch (error) {
    throw { code: "failedToUpdateride", message: error.message };
  }
}

// Method to remove an ride from a file
function remove(rideId) {
  try {
    const filePath = path.join(rideFolderPath, `${rideId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveride", message: error.message };
  }
}

// Method to list rides in a folder
function list() {
  try {
    const files = fs.readdirSync(rideFolderPath);
    const rideList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(rideFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    rideList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return rideList;
  } catch (error) {
    throw { code: "failedToListrides", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
