import mongoose from "mongoose";
import user from "./user";

const { Schema } = mongoose;

const budgetLineSchema = new Schema({
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

