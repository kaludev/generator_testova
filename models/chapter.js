import { Schema,model ,models } from "mongoose";

const chapterSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    subject:{
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    class:{
        type: Schema.Types.ObjectId,
        ref: "classCode"
    },
    questions:{
        type: [Schema.Types.ObjectId],
        ref: "question",
        default: [],
    }
});

const Chapter = models.Chapter || model('Chapter', chapterSchema);

export default Chapter;