import { Schema,model ,models } from "mongoose";

const questionSchema = new Schema({
    question:{
        type: String,
        required: true,
        unique: true
    },
    points:{
        type: Number,
        default:0
    },
    verified:{
        type: Boolean,
        default: false
    }
    

});

const Question = models.Question || model('Question', questionSchema);

export default Question;