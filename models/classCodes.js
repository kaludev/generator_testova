import { Schema,model ,models } from "mongoose";

const classCodeSchema = new Schema({
    code:{
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    numOfAttenders:{
        type: Number,
        default: 0
    }
});

const classCode = models.classCode || model('classCode', classCodeSchema);

export default classCode;