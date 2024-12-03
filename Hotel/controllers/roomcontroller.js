const roomschema = require('../Model/roomsmodel');
const model = roomschema.roomodel;

exports.createroom = async (req, res) => {
    try {
        //console.log(req.body["_id"]);
        const roomData = req.body;
        const roomnumber = String(roomData.roomnumber).padStart(2, "0");
            const room = new model({...roomData,roomnumber});
            //console.log(room.roomnumber);
            const isroomalreadyexits = await model.findOne({roomnumber: roomnumber})
            if (isroomalreadyexits != null) {
                res.status(200).json({
                    data: isroomalreadyexits,
                    message: "Room Already created"
                })
            } else {
                room.createdby = req.id;
                await room.save();
                res.status(200).json({
                    data: room,
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

exports.updateroom = async (req, res) => {
    try {
        //const room = new model(req.body);
        const roomData = req.body; // Get room data from request body
        const roomId = roomData._id;
        //console.log(roomData);
        const isroomalreadyexits = await model.findById({_id:roomId});
        if(isroomalreadyexits){
            const updateData = { ...roomData };
            delete updateData._id;
            await model.updateOne({ _id: roomId }, { $set: updateData });
            res.status(201).json({
                data:roomData,
                message:"Room details Updated sucessfully"
            });
        }
        else{
            res.status(204).json({
                data:null,
                message:"No Record Found!!"
            }); 
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