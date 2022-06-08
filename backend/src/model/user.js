const mongoose =  require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Test = require("./test")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val) {
            if(!validator.isEmail(val)) throw new Error("Is'nt email!");
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    results: [{
        type: mongoose.Schema.ObjectId,
        ref: "Result"
    }],
    tokens: [{
        token : {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    delete user.email;
    delete user.tokens
    return user;
}

userSchema.methods.generateToken = async function() {
    let token = await jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({token})
    await this.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});
    if(!user) throw "Something wrong!"
    let isM = await bcrypt.compare(password, user.password);
    if(!isM) throw "Something wrong!"
    return user;
}

userSchema.statics.findOrCreate = async (profile) => {
    let user = await User.findOne({ email: profile.email })
    if(!user) {
        user = new User({
            name: profile.name,
            email: profile.email,
            password: "authWithPassport"
        })
        await user.save()
    }
    return user
}

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) this.password = await bcrypt.hash(this.password, 8);
    next()
})

userSchema.pre("remove", async function(next) {
    await Test.deleteMany({author: this._id})
    next()
})

const User = new mongoose.model("User", userSchema)

module.exports = User