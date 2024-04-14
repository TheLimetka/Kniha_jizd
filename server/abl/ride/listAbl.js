const rideDao = require("../../dao/ride-dao.js");
const driverDao = require("../../dao/driver-dao.js");

async function ListAbl(req, res) {
  try {
    const rideList = rideDao.list();

    const driverMap = driverDao.list();

    rideList.forEach((ride) => {
      ride.userMap = driverMap[ride.id] || {};
    });

    res.json(rideList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
