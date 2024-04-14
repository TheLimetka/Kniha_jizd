const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    firstname: { type: "string" },
    surname: { type: "string" },
    phonenumber: { type: "string" },
    role: { type: "string" },
  },
  required: ["firstname", "surname", "phonenumber", "role"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let user = req.body;

    // validate input
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const userList = userDao.list();
    const phonenumberExists = userList.some((u) => u.phonenumber === user.phonenumber);
    if (phonenumberExists) {
      res.status(400).json({
        code: "phonenumberAlreadyExists",
        message: `User with phone number ${user.phonenumber} already exists`,
      });
      return;
    }

    user = userDao.create(user);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
