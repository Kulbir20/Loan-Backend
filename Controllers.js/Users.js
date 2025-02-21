const UserModel = require("../Models/UserModel");

exports.signUp = async (req, res) => {
    try {
        const UserRecord = new UserModel({ FirstName: req.body.firstName, LastName: req.body.lastName, ContactNumber: req.body.contactNumber,Email: req.body.email,Password: req.body.pass,Role: req.body.role,PanCard: req.body.panCard,AdhaarCard:req.body.adhaarCard  });

        const existingUser = await UserModel.findOne({ Email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exist" });
        }

        const result = await UserRecord.save();
    //   const token =   jwt.sign({ id: result._id }, secretKey, { expiresIn: '300s' });
        return  res.status(200).json({ msg: "Signup Successfully", result });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await UserModel.findOne({ Email: req.body.email });
        if (result) {
            console.log(result)
            res.status(200).json({ msg: "Login Successfully", result });
        } else {
            res.status(404).json({ msg: "email not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        
        const totalUsers = await UserModel.countDocuments(); 
        const totalPages = Math.ceil(totalUsers / limit);  

        const result = await UserModel.find()
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json({ msg: "List Of Users", result, totalPages }); 
    } catch (err) {
        return res.status(500).json({ msg: 'Internal server error', err });
    }
};

// exports.userInfo = async (req, res) => {
//     try {
//         const result = await UserModel.findById(req.params.id);
//         if (result) {
//             return res.status(200).json({ msg: "User Details", result });
//         } else {
//             return res.status(404).json({ msg: "User not found" });
//         }
//     } catch (err) {
//         res.status(500).json({ msg: 'Internal server error', err });
//     }
// };


exports.searchUser = async (req, res) => {
    try {
        const { field, value } = req.query;
        if (!field || !value) {
            return res.status(400).json({ msg: "Field and value are required" });
        }

        const query = {};
        query[field] = { $regex: new RegExp(`^${value}$`, 'i') };

        const result = await UserModel.findOne(query);

        if (result) {
            return res.status(200).json({ msg: "User Found", result });
        } else {
            return res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', error: err.message });
    }
};


exports.userData = async (req, res) => {
    try {
        const result = await UserModel.find();
        if (result && result.length > 0) {
            const plainResult = result[0].toObject();
            const excludeFields = ["_id", "__v", "createdAt", "updatedAt", "Password", "Role"];
            const filteredFields = Object.keys(plainResult).filter((field) => !excludeFields.includes(field));
            return res.status(200).json({ msg: "User Information Found", result: filteredFields });
        } else {
            return res.status(404).json({ msg: "User Information not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error', error: err.message });
    }
};




