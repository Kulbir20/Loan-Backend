const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./auth");

exports.signUp = async (req, res) => {
    try {
        const { FirstName, LastName, ContactNumber, Email, Password, Role, PanCard, AdhaarCard } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ Email }); 
        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exists" });
        }

        const NewRecord = new UserModel({
            FirstName,
            LastName,
            ContactNumber,
            Email,
            Password,
            Role,
            PanCard,
            AdhaarCard
        });
        const result = await NewRecord.save();
        const token = generateToken(user._id)

        return res.status(201).json({ msg: "Signup Successful", user: result, token });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};


exports.login = async (req, res) => {
    try {
        const { Email} = req.body;
        const result = await UserModel.findOne({ Email:Email });
        console.log(Email)
        const token = generateToken(result._id)
        console.log(token)
        if (result) {
            console.log(result)
            res.status(200).json({ msg: "Login Successfully", result, token });
        } else {
            res.status(404).json({ msg: "email not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    console.log("Received Token:", token); // Debug log

    if (!token) {
        return res.status(403).json({ msg: "Token is required" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1].trim();
    }
    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded Token:", decoded); // Debug log
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid or expired token" });
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




