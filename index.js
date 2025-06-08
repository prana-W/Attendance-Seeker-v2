const express = require('express');
const app = express();
const PORT = 3000;
const attendanceRoute = require('./routes/attendance.route');

app.get ('/', (req, res) => {
    res.send('Welcome to the Attendance Seeker API');
})

app.use('/attendance', attendanceRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})