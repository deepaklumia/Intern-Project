const internSchema = require("../module/internModule");
const collegeSchema = require("../module/collegeModule");
const validator = require("validator");

const internCollection = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin','*')
        let data = req.body;

        let { name, mobile, email, collegeName } = data;
        console.log(data);
        console.log(collegeName);
        if (!data || Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({ message: "please fill all required fields" });
        }
        if (!name || name === "") {
            return res.status(404).send({ message: "please enter a name" });
        }
        if (!email || email === "") {
            return res.status(404).send({ message: "please enter   an email" });
        }
        data.email = email.trim();
        if (!validator.isEmail(data.email)) {
            return res
                .status(200)
                .send({ message: "please enter a valid email" });
        }
        if (!collegeName || collegeName === "") {
            return res
                .status(404)
                .send({ message: "please enter a college name" });
        }
        data.collegeName = collegeName.trim();
        if (!mobile || mobile === "") {
            return res.status(404).send({ message: "please enter number" });
        }
        let college = await collegeSchema.findOne({
            name: collegeName,
            isDelete: false,
        });
        if (!college || Object.keys(college).length == 0) {
            return res
                .status(404)
                .send({ message: "please enter valied college name" });
        } else {
            let internData = {
                name: name,
                email: email,
                mobile: mobile,
                collegeId: college._id,
            };
            let intern = await internSchema.create(internData);
            res.status(201).send({ status: true, data: intern });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports.internCollection = internCollection;
