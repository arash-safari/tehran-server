'use strict';

module.exports = function(Page) {
  Page.pageName = function(cb) {
    Page.find(null, function(err, pages) {
      const pagNames = pages.map(page=>({pageName: page.pageName,id: page.id}));
      cb(err, pagNames);
    });
  };
  Page.remoteMethod(
    'pageName',
    {
      http: {path: '/page-names', verb: 'get'},
      returns: {arg: 'pages', type: 'array'},
    }
  );
};
