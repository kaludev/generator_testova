import { Schema,model ,models } from "mongoose";

const classNameSchema = new Schema({
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

const className = models.className || model('className', classNameSchema);

export default className;