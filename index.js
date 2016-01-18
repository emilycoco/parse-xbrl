var fs = require('fs');
var xmlParser = require('xml2json');
var FundamentalAccountingConcepts = require('./FundamentalAccountingConcepts.js');

function parse(pathToXbrlDoc) {
  var self = this;
  self.getNode = getNode;
  self.loadBaseInformation = loadBaseInformation;
  self.loadYear = loadYear;
  self.loadField = loadField;
  self.getFactValue = getFactValue;
  self.documentJson;
  self.fields = {};

  fs.readFile(pathToXbrlDoc, function(err, data) {
    self.documentJson = JSON.parse(xmlParser.toJson(data))['xbrli:xbrl'];
    self.loadBaseInformation();
    self.loadYear();
  })

  // Utility functions
  function getNode(identifier) {
    return self.documentJson[identifier];
  };

  function getNodeList(rootIdentifier) {
    return Object.keys(self.documentJson[identifier]);
  };

  function loadField(conceptToFind, fieldName, key) {
    key = key || '$t';
    fieldName = fieldName || conceptToFind;
    self.fields[fieldName] = self.getNode('dei:' + conceptToFind) ? self.getNode('dei:' + conceptToFind)[key] : fieldName + ' not found.';
  }

  function loadBaseInformation() {
    self.loadField('EntityRegistrantName');
    self.loadField('CurrentFiscalYearEndDate');
    self.loadField('EntityCentralIndexKey');
    self.loadField('EntityFilerCategory');
    self.loadField('TradingSymbol');
    self.loadField('DocumentPeriodEndDate');
    self.loadField('DocumentFiscalYearFocus');
    self.loadField('DocumentFiscalPeriodFocus');
    self.loadField('DocumentFiscalYearFocus', 'DocumentFiscalYearFocusContext', 'contextRef');
    self.loadField('DocumentFiscalPeriodFocus', 'DocumentFiscalPeriodFocusContext', 'contextRef');
    self.loadField('DocumentType');
  }

  function getFactValue(concept, periodType) {
    var contextReference;

    if (periodType === 'Instant') {
      contextReference = self.fields['ContextForInstants'];
    } else if (periodType === 'Duration') {
      contextReference = self.fields['ContextForDurations'];
    } else {
      console.warn('CONTEXT ERROR');
    }
  };

  function loadYear() {
    var currentEnd = getNode('dei:DocumentPeriodEndDate');
    if ((currentEnd.$t).match(/(\d{4})-(\d{1,2})-(\d{1,2})/)) {
      // getCurrentPeriodAndContextInformation(asdate);
      FundamentalAccountingConcepts.load(self);
    } else {
      console.warn(currentEnd + ' is not a date');
    }
  }
};

module.exports = {
    parse: parse
};
