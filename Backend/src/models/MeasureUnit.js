const mongoose = require("mongoose");

const MeasureUnitSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model("MeasureUnit", MeasureUnitSchema);
