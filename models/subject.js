import { Schema,model ,models } from "mongoose";

const subjectSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    classes:{
        type: [Schema.Types.ObjectId],
        ref: "classCode",
        default: [],
    }
});

const Subject = models.Subject || model('Subject', subjectSchema);

export default Subject;