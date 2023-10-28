import express from 'express';
import path from 'path';
import './mongodb.mjs'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'
import postRouter from './routes/post.mjs'
import jwt from 'jsonwebtoken';
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("decoded: ", decoded);
        {
            req.body.decoded = {
            isAdmin: decoded.isAdmin,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
        }}
    next();
}
        catch(e){
            res.status(401).send({ message: "Invalid token" })
        }
})


app.use("/api/v1", postRouter)
app.use("/api/v1", commentRouter)
app.use("/api/v1", feedRouter)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})
