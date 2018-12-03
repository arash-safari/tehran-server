'use strict';

module.exports = function (Page) {
  Page.pageName = function (cb) {
    // if(name===""){
    Page.find(null, function (err, pages) {
      const pagNames = pages.map(page => (
        {pageName: page.pageName, id: page.id}));
      cb(err, pagNames);
    });
    // }
    // else{
    // var pattern = new RegExp('.*'+name+'.*', "i");
    // Page.find({where: {pageName: {like: pattern}}}, function(err, pages) {
    //   const pagNames = pages.map(page=>({pageName: page.pageName,id: page.id}));
    //   cb(err, pagNames);
    // });
    // }
  };
  Page.pageData = function (name, lang, cb) {
    Page.find({where: {pageName: name}}, function(err, pages) {
      if (lang === 'en')
        lang = 'En';
      else lang = 'Fa';
      const pagNames = pages[0].data[lang];
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
  Page.remoteMethod(
    'pageData',
    {
      http: {path: '/:lang/:name', verb: 'get'},
      accepts: [{arg: 'name', type: 'string'},
        {arg: 'lang', type: 'string'}],
      returns: {arg: 'data', type: 'array'},
    }
  );
};
