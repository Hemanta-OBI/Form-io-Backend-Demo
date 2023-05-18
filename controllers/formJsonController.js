const createError = require("http-errors");
const FormModel = require("../models/formModel");
exports.addFormField = async (req, res, next) => {
  try {
    const { component, formName } = req.body;
    console.log("formName", formName);
    if (!formName) {
      console.log("formName1", formName);
      return next(createError(404, "form not found"));
    }
    const response = await FormModel.findOneAndUpdate(
      {
        formName: formName,
      },
      {
        $push: { components: component },
      },
      {
        upsert: true,
      }
    );
    console.log("response", response);
    return res.status(201).json({ message: "success", status: true });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
exports.removeFormField = async (req, res, next) => {
  try {
    const { key, formName } = req.body;
    const response = await FormModel.findByIdAndUpdate(
      {
        formName: formName,
      },
      {
        $pull: { components: { key: key } },
      }
    );
    console.log("response", response);
    return res.status(201).json({ message: "success", status: true });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
exports.getAllFroms = async (req, res, next) => {
  try {
    const { formName } = req.query;
    console.log("formName", formName);
    if (formName) {
      const response = await FormModel.findOne({
        formName: formName,
      }).select({
        components: 1,
        formName: 1,
        _id: 1,
      });

      return res.status(200).json({
        formName: response.formName,
        components: response.components,
        _id: response._id,
        type: "form",
        status: true,
      });
    }

    const response = await FormModel.find()
      .select({
        _id: 1,
        components: 1,
        formName: 1,
      })
      .sort({ formName: 1 });
    return res.status(200).json({
      forms: response,
      status: true,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.addNewFrom = async (req, res, next) => {
  try {
    const { formName, components } = req.body;
    const doesExists = await FormModel.findOne({ formName: formName });
    if (doesExists) {
      return next(createError(400, "Form already exists"));
    }
    const response = await FormModel.create({
      formName: formName,
      components: components,
    });
    return res
      .status(201)
      .json({ message: "success", status: true, form: response });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
