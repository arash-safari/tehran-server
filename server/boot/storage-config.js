'use strict';

module.exports = function(app) {
  app.dataSources.fileStorage.connector
    .getFilename = function(uploadingFile, req, res) {
      return Math.random().toString().substr(2) + '.jpg';
    };
};
