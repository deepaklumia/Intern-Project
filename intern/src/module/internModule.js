const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const internSchema = new mongoose.Schema({
      name: {type:String, required:true,unique:true},
      email: {type:String},
      mobile: {
            type: String,
            // required: [true, 'User phone number required'],
            //unique: [true, 'User with this phone number already exists'],
            validate: {
                validator: function (str) {
                    return /\d{10}/.test(str);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
      collegeId: {type:objectId,ref:"College"},
      isDelete: {type:Boolean, default:false}

},{timestamps:true});
module.exports = mongoose.model('Intern',internSchema);