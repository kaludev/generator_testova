import { Schema,model ,models } from "mongoose";

const questionSchema = new Schema({
    question:{
        type: String,
        required: true
    },
    points:{
        type: Number,
        default:0
    },
    verified:{
        type: Boolean,
        default: false
    },author:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

});

const Question = models.Question || model('Question', questionSchema);

export default Question;