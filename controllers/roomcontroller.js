const roomschema = require('../models/roomsmodel');
const model = roomschema.roomodel;

exports.createroom = async (req, res) => {
    try {
        const room = new model(req.body);
        //console.log(room.roomnumber);
        const isroomalreadyexits = await model.findOne({roomnumber: room.roomnumber })
        if (isroomalreadyexits != null) {
            res.status(200).json({
                data: isroomalreadyexits,
                message: "Room Already created"
            })
        } else {
            room.createdby = req.id;
            await room.save();
            res.status(200).json({
                data: null,
                message: "Room created sucessfully"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            data: null,
            message: "Failed to create room"
        })
    }
}

exports.getroombyid = async (req, res) => {
    try {
        const isroomfound = await model.findById(req.body.id);
        if (isroomfound != null) {
            res.status(200).json({
                data: isroomfound,
                message: "Room fetched sucessfuly"
            })
        }else{
            res.status(200).json({
                data: null,
                message: "Please create room"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            data: null,
            message: "Failed to fetch rooms"
        })
    }
}

exports.getallrooms = async (req, res) => {
    try {
        const data = new model(req.body);
        const isroomfound = await model.find();
        if (isroomfound != null) {
            res.status(200).json({
                data: isroomfound,
                message: "Rooms fetched sucessfuly"
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
            message: "Failed to fetch rooms"
        })
    }
}