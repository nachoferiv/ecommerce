"use strict";
var mongoose = require('mongoose');
var url = process.env.MONGODB_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
