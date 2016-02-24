var ParseXbrl = require('./index.js');
var parsed = ParseXbrl.parse('./test/sampleXbrlDocuments/cannabics_pharmaceuticals_inc_10k.xml');
parsed.then(function(parsedDoc) {
  console.log('RESULTS', parsedDoc);
})
