# parse-xbrl

Module to parse xbrl documents and output json.

## Installation

```
Dependency: npm install --save parse-xbrl
Dev Dependency: npm install --save-dev parse-xbrl
```

## Usage
Xbrl is a standardized language based on xml used to codify financial reporting. This module provides two tasks, parse and parseStr. parse takes one parameter, a file path to an xbrl document, and returns a promise that resolves with a json document of key financial data from the file. ParseStr takes a string of XML and returns the same promise. Xbrl documents can be malformed and inaccurate, so results aren't guaranteed. This module is based on the [python xbrl parser](https://github.com/lukerosiak/pysec) written by Luke Rosiak. Check out the web client for this package [here](http://www.xbrltojson.com/).


###### Example usage:

```
var ParseXbrl = require('parse-xbrl');

// path to locally accessible file, does not load file over http/https
ParseXbrl.parse('./test/sampleXbrlDocuments/amazon_10k.xml').then(function(parsedDoc) {
  // Use results...
});

// string of correctly formatted xml/xbrl
ParseXbrl.parseStr('<?xml version="1.0" encoding="US-ASCII"?>
<xbrli:xbrl xmlns:amzn="http://www.amazon.com/20151231" xmlns:country="http://xbrl.sec.gov/country/2013-01-31">').then(function(parsedString) {
  // Use results...
});
```


###### Example output for Amazon's 10k (annual) statement:

```
{
  EntityRegistrantName: 'AMAZON COM INC',
  CurrentFiscalYearEndDate: '--12-31',
  EntityCentralIndexKey: '0001018724',
  EntityFilerCategory: 'Large Accelerated Filer',
  TradingSymbol: 'AMZN',
  DocumentPeriodEndDate: '2015-12-31',
  DocumentFiscalYearFocus: '2015',
  DocumentFiscalPeriodFocus: 'FY',
  DocumentFiscalYearFocusContext: 'FD2015Q4YTD',
  DocumentFiscalPeriodFocusContext: 'FD2015Q4YTD',
  DocumentType: '10-K',
  BalanceSheetDate: '2015-12-31',
  IncomeStatementPeriodYTD: '2015-01-01',
  ContextForInstants: 'FI2015Q4',
  ContextForDurations: 'FD2015Q4YTD',
  Assets: 65444000000,
  CurrentAssets: 36474000000,
  NoncurrentAssets: 28970000000,
  LiabilitiesAndEquity: 65444000000,
  Liabilities: 52060000000,
  CurrentLiabilities: 33899000000,
  NoncurrentLiabilities: 18161000000,
  CommitmentsAndContingencies: 0,
  TemporaryEquity: 0,
  Equity: 13384000000,
  EquityAttributableToNoncontrollingInterest: 0,
  EquityAttributableToParent: 13384000000,
  Revenues: 107006000000,
  CostOfRevenue: 71651000000,
  GrossProfit: 35355000000,
  OperatingExpenses: 33122000000,
  CostsAndExpenses: 104773000000,
  OtherOperatingIncome: 0,
  OperatingIncomeLoss: 2233000000,
  NonoperatingIncomeLoss: -665000000,
  InterestAndDebtExpense: 0,
  IncomeBeforeEquityMethodInvestments: 1568000000,
  IncomeFromEquityMethodInvestments: -22000000,
  IncomeFromContinuingOperationsBeforeTax: 1568000000,
  IncomeTaxExpenseBenefit: 950000000,
  IncomeFromContinuingOperationsAfterTax: 596000000,
  IncomeFromDiscontinuedOperations: 0,
  ExtraordaryItemsGainLoss: 0,
  NetIncomeLoss: 596000000,
  NetIncomeAvailableToCommonStockholdersBasic: 596000000,
  PreferredStockDividendsAndOtherAdjustments: 0,
  NetIncomeAttributableToNoncontrollingInterest: 0,
  NetIncomeAttributableToParent: 596000000,
  OtherComprehensiveIncome: -212000000,
  ComprehensiveIncome: 384000000,
  ComprehensiveIncomeAttributableToParent: 384000000,
  ComprehensiveIncomeAttributableToNoncontrollingInterest: 0,
  NonoperatingIncomeLossPlusInterestAndDebtExpense: -665000000,
  NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments: -665000000,
  NetCashFlow: 1333000000,
  NetCashFlowsOperating: 11920000000,
  NetCashFlowsInvesting: -6450000000,
  NetCashFlowsFinancing: -3763000000,
  NetCashFlowsOperatingContinuing: 11920000000,
  NetCashFlowsInvestingContinuing: -6450000000,
  NetCashFlowsFinancingContinuing: -3763000000,
  NetCashFlowsOperatingDiscontinued: 0,
  NetCashFlowsInvestingDiscontinued: 0,
  NetCashFlowsFinancingDiscontinued: 0,
  NetCashFlowsDiscontinued: 0,
  ExchangeGainsLosses: -374000000,
  NetCashFlowsContinuing: 1707000000,
  SGR: 0.046606193306224585,
  ROA: 0.009107022798117474,
  ROE: 0.04453078302450687,
  ROS: 0.0055697811337682
}
```

## Credits
[Emily Coco](https://github.com/emilycoco/)

## License

MIT
