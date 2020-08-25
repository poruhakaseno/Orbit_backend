const mongoose = require("mongoose");

const trackingSchema = mongoose.Schema({
    trackingNo: { type: String, required: true },
    status: { type: String, required: true },
    shipto: { type: String, required: true },
    //unloadingPoint: { type: String, required: true },
    //recipient: { type: String, required: true },
    po: { type: String, required: true },
    vendor: { type: String, required: true },
    //createdBy: { type: String, required: true },
    //createdTimeStamp: { type: String, required: true },
});

module.exports = mongoose.model("Tracking", trackingSchema);