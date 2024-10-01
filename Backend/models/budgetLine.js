import mongoose from "mongoose";

const { Schema } = mongoose;

const budgetLineSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budget_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
    line_no: {
      type: Number,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    service_name: {
      type: String,
      required: true,
      maxlength: 250,
    },
    measure_unit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeasureUnit",
      required: true,
    },
    measure_unit_name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    quantity: {
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

budgetLineSchema.pre('save', async function (next) {
    if (this.isNew) {
        const count = await BudgetLine.countDocuments({ budget_id: this.budget_id });
        this.line_no = count + 1;
    }
});

const BudgetLine = mongoose.model("BudgetLine", budgetLineSchema);
export default BudgetLine;

