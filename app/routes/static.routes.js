var path = require('path');
var serveIndex = require('serve-index');
const express = require("express");

var viewDir = path.join(__dirname, '/../views');

function view(endpoint,app, dirname) {
    let folderDir = path.join(viewDir, `/${dirname}`)
    app.use(endpoint, express.static(folderDir))
    app.use(endpoint, serveIndex(folderDir));
}

module.exports = function (app) {
    view('/', app, 'form')
    view('/admin', app, 'admin')
};