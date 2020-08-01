const validate = (values) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "Required";
  }
  return errors;
};

module.exports = validate;
