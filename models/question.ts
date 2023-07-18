import { Schema, model, models } from 'mongoose';

const questionSchema = new Schema({
    creator:{
        id:{type:String,required:[true,'Id required']},
        name:{type:String,required:[true,'Name required']},
        image:{type:String,required:[true,'Image required']}
    },
    question:{
        type: String,
        required: [true, 'Question is required'],
    },
    answers:{
        type: Array,
    }

});

const Question = models.questions || model("questions", questionSchema);

export default Question;