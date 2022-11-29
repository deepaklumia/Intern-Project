const collegeModule = require("../module/collegeModule");
const collegeSchema = require("../module/collegeModule");
const internModel = require("../module/internModule");
const collegeCollection = async function (req, res) {
    try {
        let data = req.body;
        let { name, fullName, logoLink } = data;
        if (Object.keys(data).length == 0 || !data) {
            return res
                .status(404)
                .send({ message: "please enter all mandatory fields" });
        }
        if (!name || name === "") {
            return res.status(404).send({ message: "please enter a name" });
        }
        if (!fullName || fullName === "") {
            return res
                .status(404)
                .send({ message: "please enter a full name" });
        }
        if (!logoLink || logoLink === "") {
            return res
                .status(404)
                .send({ message: "please enter a logo link" });
        }
        let college = await collegeSchema.create(data);
        return res.status(201).send({ status: true, data: college });
    } catch (error) {
        console.log(error);
        return res.status(505).send({ status: false, massege: error.massege });
    }
};
const collegeDetails = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin",'*');
        let collegeName = req.query.collegeName;
        if (!collegeName) {
            return res
                .status(404)
                .send({
                    status: false,
                    message: "coollege name must be persent",
                });
        }
        let college = await collegeModule.findOne({
            name: collegeName,
            isDeleted: false,
        });
        if (!college) {
            return res.status(404).send({ massege: "not find college" });
        } else {
            let collegeData = {
                name: college.name,
                fullName: college.fullName,
                logoLink: college.logoLink,
            };
            let intern = await internModel
                .find(
                    { collegeId: college._id, isDelete: false },
                    "-collegeId -isDeleted -createdAt -updatedAt -__v"
                )
                .sort({ createdAt: -1 });
            if (intern) {
                collegeData.intern = intern;
            }
            return res.status(200).send({ status: true, data: collegeData });
        }
    } catch (error) {
        console.log(error);
        return res.status(505).send({ status: false, message: error.message });
    }
};
module.exports.collegeCollection = collegeCollection;
module.exports.collegeDetails = collegeDetails;
