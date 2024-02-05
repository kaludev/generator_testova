import { Schema,model ,models } from "mongoose";

const chapterSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    subjectId:{
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    classId:{
        type: Schema.Types.ObjectId,
        ref: "classCode"
    },
    questions:{
        type: [Schema.Types.ObjectId],
        ref: "Question",
        default: [],
    }
});

const Chapter = models.Chapter || model('Chapter', chapterSchema);

export default Chapter;