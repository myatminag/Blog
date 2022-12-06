import experss from "express";
import mongoose from "mongoose";
import cors from "cors";

import { config } from "./config/db.js";
import Log from "./lib/log.js";
import postRoutes from "./routes/post.js";
import uploadRoutes from "./routes/uploadImage.js";
import authRoutes from "./routes/auth.js";
import authorRoutes from "./routes/author.js";
import applyRoutes from "./routes/apply.js";

const app = experss();

app.use(experss.json());

app.use(cors());

/** Routes */ 
app.use('/server/upload', uploadRoutes);

app.use('/server/posts', postRoutes);

app.use('/server/auth', authRoutes);

app.use('/server/authors', authorRoutes);

app.use('/server/apply', applyRoutes);

/** Connect to DB */
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Log.info('Connect Mongo')
    })
    .catch((error) => {
        Log.error(error)
    })

/** Server */
app.get('/', (req, res, next) => {
    res.send('Server is running.')
}) 

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on 4000`);
});