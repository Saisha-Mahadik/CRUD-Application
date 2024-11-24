const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectedToMongoDB } = require('./src/configration/dbConfig');
const postRoutes = require('./src/routes/postRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/posts', postRoutes);  

connectedToMongoDB();

app.listen(port, () => {
    console.log(`Server is running on :${port}`);
});


const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Ensure correct path
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});




const upload = multer({ storage });
