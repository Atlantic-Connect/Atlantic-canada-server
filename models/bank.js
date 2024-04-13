const mongoose = require('mongoose');

const bankNameSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
});

const BankName = mongoose.model('bank', bankNameSchema);

module.exports = BankName;
