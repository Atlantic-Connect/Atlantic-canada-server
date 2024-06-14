const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const teamMemberSchema = new Schema({
    about_emp_img: { type: String, required: true },
    about_emp_name: { type: String, required: true },
    about_emp_job_title: { type: String, required: true },
    about_emp_desc: { type: String, required: true }
});

// Define the about us schema
const aboutUsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    team_members: [teamMemberSchema] // An array of team members
});


const about_us = mongoose.model('about_us', aboutUsSchema);

module.exports = about_us;
