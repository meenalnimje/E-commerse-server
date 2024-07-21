const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  quatity: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    // ref:"module.exports = mongoose.model("ecomm-user", userSchema); ecomm-user"
    ref: "product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ecomm-user",
    required: true,
  },
  size: { type: mongoose.Schema.Types.Mixed },
  color: { type: mongoose.Schema.Types.Mixed },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
module.exports = mongoose.model("cart", cartSchema);
