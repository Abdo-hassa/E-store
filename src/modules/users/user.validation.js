const repository = require("./user.repository");
const schema = require("./user.schema");
const validator = require("validator");
const Ajv = require("ajv").default;
const AjvFormats = require("ajv-formats");
const ajv = new Ajv({ allErrors: true });
AjvFormats(ajv, ["date", "time", "date-time", "email", "url"]);

const validateEmail = async (userIsValid, email, errors = []) => {
  if (!validator.isEmail(email)) {
    userIsValid = false;
    errors.push({
      keyword: "type",
      dataPath: "/email",
      message: "should be valid",
    });
  }

  if (!(await isUniqueEmail(email))) {
    userIsValid = false;
    errors.push({
      dataPath: "/email",
      message: "should be unique",
    });
  }
  return { valid: userIsValid, errors };
};

const validation = async (user) => {
  let validate = ajv.compile(schema);

  let valid = validate(user);
  let errors = validate.errors;
  if (!errors) errors = [];

  ({ valid, errors } = await validateEmail(valid, user.email, errors));

  if (errors) {
    errors.forEach((error) => {
      error.dataPath = error.dataPath.split("/")[1];
    });

    return { valid, errors };
  }
  return { valid, errors };
};

const isBodyValid = (user) => {
  let valid = true,
    errors = [];

  if (user.firstName) {
    if (typeof user.firstName !== "string" || user.firstName.length < 1) {
      valid = false;
      errors.push({
        dataPath: "firstName",
        message: "should be string and longer than 1 character",
      });
    }
  }

  if (user.lastName) {
    if (typeof user.lastName !== "string" || user.lastName.length < 1) {
      valid = false;
      errors.push({
        dataPath: "lastName",
        message: "should be string and longer than 1 character",
      });
    }
  }

  if (user.favourites) {
    if (!Object.prototype.hasOwnProperty.call(user.favourites, "teams")) {
      valid = false;
      errors.push({
        dataPath: "favourites",
        message: "should have teams.",
      });
    } else {
      let uniqueTeams = new Set(user.favourites.teams);
      user.favourites.teams = [...uniqueTeams];

      user.favourites.teams.forEach((team) => {
        if (!validator.isMongoId(team)) {
          valid = false;
          errors.push({
            dataPath: "favourites.teams",
            message: "should be mongo id.",
          });
        }
      });
    }
  }

  return { valid, errors };
};

const isUniqueEmail = async (email) => {
  const emails = await repository.count({ email });

  if (emails > 0) return false;
  return true;
};

module.exports = { validation, isBodyValid, validateEmail };
