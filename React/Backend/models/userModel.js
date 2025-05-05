const { DataTypes } = require("sequelize")
const Connection = require("../db")


const User = Connection.define('user', {
    FirstName: { type: DataTypes.STRING, allowNull: false },
    LastName: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }},
    Address: { type: DataTypes.STRING, allowNull: false },
    Phone: { type: DataTypes.STRING, allowNull: false, validate: { is: /^[0-9]{10}$/ }},
    Gender: { type: DataTypes.STRING, allowNull: false },
    DOB: { type: DataTypes.DATEONLY, allowNull: false },
    Hobbies: { type: DataTypes.STRING, allowNull: false },
    Image: { type: DataTypes.STRING, allowNull: false }
},
    {
        timestamps: true
    }
)
module.exports = User