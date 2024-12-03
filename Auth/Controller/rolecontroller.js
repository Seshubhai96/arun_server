const roledata = require('../Models/rolemodel');
const model = roledata.role;
exports.createrole = async (req, res) => {
    try {
        const data = new model(req.body);
       // console.log(data);
        const isroomalreadyexits = await model.findOne({ rolename: data.rolename });
        if (isroomalreadyexits != null) {
            return res.status(200).json({
                data: isroomalreadyexits,
                message: "Role Already Exist"
            });
        }
        else {
            data.createdby = req.id;
            await data.save();
            return res.status(200).json({
                data: data,
                message: "Role Created Sucessfully"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            data: null,
            message: "Failed to create role"
        });
    }
}

exports.getrolebyid = async (req, res) => {
    try {
        const isroomfound = await model.findById(req.body.id);
        if (isroomfound != null) {
            res.status(200).json({
                data: isroomfound,
                message: "Role fetched sucessfuly"
            })
        }else{
            res.status(200).json({
                data: null,
                message: "Please create Role"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            data: null,
            message: "Failed to fetch Role"
        })
    }
}

exports.getallroles = async (req, res) => {
    try {
        const data = new model(req.body);
        const isroomfound = await model.find();
        if (isroomfound != null) {
            res.status(200).json({
                data: isroomfound,
                message: "Roles fetched sucessfuly"
            })
        }else{
            res.status(200).json({
                data: null,
                message: "No records"
            })
        }

    } catch (error) {
        res.status(400).json({
            data: null,
            message: "Failed to fetch Roles"
        })
    }
}