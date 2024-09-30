import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    measure_unit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeasureUnit",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 250,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1024,
    },
    cost: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);