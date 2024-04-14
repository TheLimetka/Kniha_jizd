const fs = require("fs");
const path = require("path");

const driverFolderPath = path.join(__dirname, "storage", "driverList");

// Method to read an driver from a file
function get(userId, eventId) {
  try {
    const driverList = list();
    const driver = driverList.find(
      (a) => a.userId === userId && a.eventId === eventId
    );
    return driver;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReaddriver", message: error.message };
  }
}

// Method to update driver in a file
function update(driver) {
  try {
    const currentdriver = get(driver.userId, driver.eventId) || {};
    if (currentdriver.file) {
      const filePath = path.join(driverFolderPath, currentdriver.file);
      fs.unlinkSync(filePath);
    }
    const newdriver = { ...currentdriver, ...driver };

    const filePath = path.join(
      driverFolderPath,
      `${newdriver.userId}_${newdriver.eventId}_${newdriver.driver}_${newdriver.guests}.txt`
    );
    fs.writeFileSync(filePath, "", "utf8");
    return newdriver;
  } catch (error) {
    throw { code: "failedToUpdatedriver", message: error.message };
  }
}

// Method to remove an driver from a file
function remove(userId, eventId) {
  try {
    const driver = get(userId, eventId);
    if (driver) {
      const filePath = path.join(driverFolderPath, driver.file);
      fs.unlinkSync(filePath);
    }
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovedriver", message: error.message };
  }
}
// Method to list drivers in a folder
function list() {
  try {
    const files = fs.readdirSync(driverFolderPath);
    const driverList = files.map((file) => {
      const driverData = file.replace(".txt", "").split("_");
      return {
        userId: driverData[0],
        eventId: driverData[1],
        driver: driverData[2],
        guests: Number(driverData[3]),
        file,
      };
    });
    return driverList;
  } catch (error) {
    throw { code: "failedToListdrivers", message: error.message };
  }
}

function eventMap() {
  const driverList = list();
  const driverMap = {};
  driverList.forEach((driver) => {
    if (!driverMap[driver.eventId])
      driverMap[driver.eventId] = {};
    if (!driverMap[driver.eventId][driver.userId])
      driverMap[driver.eventId][driver.userId] = {};
    driverMap[driver.eventId][driver.userId] = {
      driver: driver.driver,
      guests: driver.guests,
    };
  });
  return driverMap;
}
// Method to check if a driver exists
function exists(userId, eventId) {
  try {
    const driverList = list();
    const driver = driverList.find(
      (a) => a.userId === userId && a.eventId === eventId
    );
    return !!driver;
  } catch (error) {
    throw { code: "failedToCheckIfDriverExists", message: error.message };
  }
}
function userMap() {
  const driverList = list();
  const driverMap = {};
  driverList.forEach((driver) => {
    if (!driverMap[driver.userId])
      driverMap[driver.userId] = {};
    if (!driverMap[driver.userId][driver.eventId])
      driverMap[driver.userId][driver.eventId] = {};
    driverMap[driver.userId][driver.eventId] = {
      driver: driver.driver,
      guests: driver.guests,
    };
  });
  return driverMap;
}

module.exports = {
  get,
  update,
  remove,
  list,
  eventMap,
  userMap,
};
