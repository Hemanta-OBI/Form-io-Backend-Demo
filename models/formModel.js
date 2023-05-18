const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    components: { type: [], default: [] },
    formName: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("form_json", formSchema);
