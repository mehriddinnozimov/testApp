const Test = require("../model/test")
const User = require("../model/user")

module.exports = async (firstTime = false) => {
	const envAdmin = {
		AdminName: process.env.ADMIN_NAME,
		AdminEmail: process.env.ADMIN_EMAIL,
		AdminPassword: process.env.ADMIN_PASSWORD
	}
	const a = await User.findOne({email: envAdmin.AdminEmail})
	if(!a) {
		const admin = new User({
			name: envAdmin.AdminName,
			isAdmin: true,
			email: envAdmin.AdminEmail,
			password: envAdmin.AdminPassword
		})

		const defaultUser = new User({
			name: "defaultUser",
			isAdmin: false,
			email: "defaultUser@def.com",
			password: "defaultPassword"
		})

		const defaultTest = new Test({
			title: "Default Tests",
			subject: "default",
			difficulty: 1,
			author: defaultUser._id
		})

		await admin.save()
		await defaultUser.save()
		await defaultTest.save()
	}


}