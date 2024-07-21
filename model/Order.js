const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    items: { type: [mongoose.Schema.Types.Mixed], required: true },
    totalPrice: { type: Number },
    totalItems: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ecomm-user",
      required: true,
    },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "pending" },
    selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("order", orderSchema);
