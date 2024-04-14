const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const carDao = require("../../dao/car-dao.js");

const schema = {
  type: "object",
  properties: {
    id_car: { type: "number" },
    VIN: { type: "number" },
    SPZ: { type: "string" },
    Rok_vyroby: { type: "number" },
    Palivo: { type: "string" }
  },
  required: ["VIN", "SPZ", "Rok_vyroby", "Palivo"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let car = req.body;

    // validate input
    const valid = ajv.validate(schema, car);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    const carList = carDao.list();
    
    const VINExists = carList.some((u) => u.VIN === car.VIN);
    if (VINExists) {
      res.status(400).json({
        code: "VIN_AlreadyExists",
        message: `car with VIN ${car.VIN} already exists`,
      });
      return;
    }
    const SPZExists = carList.some((u) => u.SPZ === car.SPZ);
    if (SPZExists) {
      res.status(400).json({
        code: "SPZ_AlreadyExists",
        message: `car with SPZ ${car.SPZ} already exists`,
      });
      return;
    }


    car = carDao.create(car);
    res.json(car);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
