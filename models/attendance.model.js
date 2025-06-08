const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    // the registration number of the student whose attendance is being recorded
    reg_no:{
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    current_time:{
        type: String,
        required: true
    },
    subjects: [{
        serial_number: Number,
        subject_code: String,
        subject_name: String,
        faculty_name: String,
        total_classes: String,
        attendance: String
    }]
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;