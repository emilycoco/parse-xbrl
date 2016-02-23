var ParseXbrl = require('./index.js');
var parsed = ParseXbrl.parse('./test/sampleXbrlDocuments/wl_ross_holding_corp_10k.xml');
parsed.then(function(parsedDoc) {
  console.log('RESULTS', parsedDoc);
})
