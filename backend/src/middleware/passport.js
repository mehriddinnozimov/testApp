const passport = require("passport")
const { Strategy } = require("passport-google-oauth20")

const User = require("../model/user")

passport.use(new Strategy({
	callbackURL: "/auth/google/callback",
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
	const user = await User.findOrCreate(profile._json)
	done(null, user)
}))

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((obj, done) => {
	done(null, obj)
})



module.exports = passport