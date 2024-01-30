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
    }
});

const classCode = models.classCode || model('classCode', classCodeSchema);

export default classCode;