const LoanModel = require("../Models/LoanFormModel");
const UserModel = require("../Models/UserModel"); 

exports.loanApplied = async (req, res) => {
    try {
        const { UserId, BankAccNo, IfscCode, AccountHoldernName, PanCard, SalarySlip, BankPassbook } = req.body;
        const user = await UserModel.findById(UserId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const LoanRecord = new LoanModel({
            UserId, 
            BankAccNo, 
            IfscCode, 
            AccountHoldernName, 
            PanCard, 
            SalarySlip, 
            BankPassbook
        });

        const result = await LoanRecord.save();
        return res.status(201).json({ msg: "Loan Applied Successfully", result });

    } catch (err) {
        console.error("Error applying for loan:", err);
        return res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
};

exports.loanUsers = async (req, res) => {
    try {
        // Fetch all loan applications and populate user details
        const result = await LoanModel.find().populate("UserId", "FirstName LastName ContactNumber Email");

        if (!result || result.length === 0) {
            return res.status(404).json({ success: false, message: 'No loan applications found' });
        }

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error("Error fetching loan details:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
