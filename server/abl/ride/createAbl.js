const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const rideDao = require("../../dao/ride-dao.js");
const driverDao = require("../../dao/driver-dao.js");

const schema = {
  type: "object",
  properties: {
    id_driver: { type: "number" },
    id_car: { type: "string" },
    date: { type: "string", format: "date-time" },
    kilometers_start: { type: "number" },
    kilometers_end: { type: "number" },
  },
  required: ["id_car", "id_driver", "date", "kilometers_start", "kilometers_end"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let ride = req.body;
    
    // validate input
    const valid = ajv.validate(schema, ride);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    
    if (ride.kilometers_end <= ride.kilometers_start) {
      res.status(400).json({
        code: "invalidendKilometers",
        message: "kilometers_end must be greater than kilometers_start",
      });
      return;
    }

    ride = rideDao.create(ride);
    res.json(ride);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
