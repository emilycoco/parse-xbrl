var fs = require('fs');
var _ = require('lodash');
var xmlParser = require('xml2json');
var FundamentalAccountingConcepts = require('./FundamentalAccountingConcepts.js');

function parse(pathToXbrlDoc) {
  var self = this;
  self.loadYear = loadYear;
  self.loadField = loadField;
  self.getFactValue = getFactValue;
  self.documentJson;
  self.fields = {};
  self.getNodeList = getNodeList;
  self.getCurrentPeriodAndContextInformation = getCurrentPeriodAndContextInformation;
  self.lookForAlternativeInstanceContext = lookForAlternativeInstanceContext;

  // Load xml and parse to json
  fs.readFile(pathToXbrlDoc, function(err, data) {
    // fs.writeFile('parsedXml.json', xmlParser.toJson(data), function(err) {
    //   console.log(err)
    // })
    var jsonObj =JSON.parse(xmlParser.toJson(data));
    self.documentJson = jsonObj[Object.keys(jsonObj)[0]];

    // Calculate and load basic facts from json doc
    init();
  })

  function init() {
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
    var currentYearEnd = self.loadYear();
    if (currentYearEnd) {
      self.getCurrentPeriodAndContextInformation(currentYearEnd);
      FundamentalAccountingConcepts.load(self);
    }
  }

  // Utility functions
  function loadField(conceptToFind, fieldName, key) {
    key = key || '$t';
    fieldName = fieldName || conceptToFind;
    self.fields[fieldName] = _.get(self.documentJson, ['dei:' + conceptToFind, key], 'Field not found.');
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
    var currentEnd = _.get(self.documentJson, ['dei:DocumentPeriodEndDate', '$t']);
    if ((currentEnd).match(/(\d{4})-(\d{1,2})-(\d{1,2})/)) {
      return currentEnd;
    } else {
      console.warn(currentEnd + ' is not a date');
      return false;
    }
  }

  function getNodeList(nodeNamesArr, root) {
    root = root || self.documentJson;
    var allNodes = [];

    for (var i = 0; i < nodeNamesArr.length; i++) {
      allNodes = allNodes.concat(_.get(root, nodeNamesArr[i]));
    }

    // Remove undefined nodes
    return _.filter(allNodes, function(node) {
      if (node) {
        return true;
      }
    });
  }

  // Figures out the current period and contexts for the current period instance/duration contexts
  function getCurrentPeriodAndContextInformation(endDate) {
    self.fields['BalanceSheetDate'] = 'ERROR';
    self.fields['IncomeStatementPeriodYTD'] = 'ERROR';
    self.fields['ContextForInstants'] = 'ERROR';
    self.fields['ContextForDurations'] = 'ERROR';

    var useContext = 'ERROR';
    var startDate = 'ERROR'
    var startDateYTD = '2099-01-01'
    var useContext2 = 'ERROR'

    var instanceNodesArr;
    var contextId;
    var contextPeriod;
    var periodsWithCorrectInstanceContextAndEndDate;
    var instanceHasExplicitMember;
    var contextForInstants;

    var durationNodesArr;
    var contextId2;
    var contextPeriod2;
    var periodsWithCorrectDurationContextAndEndDate;
    var durationHasExplicitMember;
    var startDate;
    var contextForDurations;

    // Uses the concept ASSETS to find the correct instance context
    instanceNodesArr = self.getNodeList(['us-gaap:Assets', 'us-gaap:AssetsCurrent', 'us-gaap:LiabilitiesAndStockholdersEquity']);

    for (var i = 0; i < instanceNodesArr.length; i++) {

      contextId = instanceNodesArr[i].contextRef;

      periodsWithCorrectInstanceContextAndEndDate = _.filter(_.get(self.documentJson, 'xbrli:context'), function(period) {
        if (period.id === contextId) {
          contextPeriod = _.get(period, ['xbrli:period', 'xbrli:instant']);

          if (contextPeriod && contextPeriod === endDate) {
            instanceHasExplicitMember = _.get(period, ['xbrli:entity', 'xbrli:segment', 'xbrldi:explicitMember'], false)

            if (instanceHasExplicitMember) {
              return true;
            } else {
              useContext = contextId;
              console.log('Use Context:', useContext);
            }
          }
        }
      })
    }

    contextForInstants = useContext
    self.fields['ContextForInstants'] = contextForInstants;


    // This finds the duration context
    durationNodesArr = self.getNodeList([
      'us-gaap:CashAndCashEquivalentsPeriodIncreaseDecrease',
      'us-gaap:CashPeriodIncreaseDecrease',
      'us-gaap:NetIncomeLoss',
      'dei:DocumentPeriodEndDate'
      ]);

    for (var k = 0; k < durationNodesArr.length; k++) {
      contextId2 = durationNodesArr[k].contextRef;
      periodsWithCorrectDurationContextAndEndDate = _.filter(_.get(self.documentJson, 'xbrli:context'), function(period) {
        if (period.id === contextId2) {
          contextPeriod2 = _.get(period, ['xbrli:period', 'xbrli:endDate']);
          if (contextPeriod2 === endDate) {
            durationHasExplicitMember = _.get(period, ['xbrli:entity', 'xbrli:segment', 'xbrldi:explicitMember'], false);
            if (durationHasExplicitMember) {
              return true;
            } else {
              startDate = _.get(period, ['xbrli:period', 'xbrli:startDate']);
              console.log('Context start date:', startDate);
              console.log('YTD start date:', startDateYTD);

              if (startDate <= startDateYTD) {
                console.log('Context start date is less than current year to date, replace');
                console.log('Context start date: ', startDate);
                console.log('Current min: ', startDateYTD);

                startDateYTD = startDate;
                useContext = _.get(period, 'id');
              } else {
                console.log('Context start date is greater than YTD, keep current YTD');
                console.log('Context start date: ', startDate);
              }

              console.log('Use context ID: ', useContext);
              console.log('Current min: ', startDateYTD);
              console.log('');
              console.log('Use context: ', useContext);
              lookForAlternativeInstanceContext()
            }
          }
        }
      });
    }
    self.fields['BalanceSheetDate'] = endDate;

    if (contextForInstants === 'ERROR') {
      contextForInstants = self.lookForAlternativeInstanceContext();
      self.fields['ContextForInstants'] = contextForInstants;
    }

    self.fields['IncomeStatementPeriodYTD'] = startDateYTD
    contextForDurations = useContext
    self.fields['ContextForDurations'] = contextForDurations;
  }

  function lookForAlternativeInstanceContext() {
    var altContextId = null;
    altNodesArr = _.filter(_.get(self.documentJson, ['xbrli:context', 'xbrli:period', 'xbrli:instant']), function(node) {
      if (node === self.fields['BalanceSheetDate']) {
        return true;
      }
    })

    for (var h = 0; h < altNodesArr.length; h++) {
      _.forEach(_.get(self.documentJson, ['us-gaap:Assets']), function(node) {
        if (node.contextRef === altNodesArr[h].id) {
          altContextId = altNodesArr[h].id;
        }
      })
    }
    return altContextId;
  }
};

module.exports = {
    parse: parse
};
