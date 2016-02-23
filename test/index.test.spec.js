var ParseXbrl = require('../index.js');

var wlRossHolingCorp10kParsed = {
 'NetCashFlowsContinuing': -791415.0,
 'NetCashFlowsFinancingDiscontinued': 0,
 'NetIncomeAvailableToCommonStockholdersBasic': -332612.0,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense': 1109024.0,
 'NoncurrentLiabilities': 18309150.0,
 'IncomeFromContinuingOperationsBeforeTax': 332612.0,
 'ContextForInstants': 'PAsOn12_31_2015',
 'Equity': 5000002.0,
 'EntityFilerCategory': 'Accelerated Filer',
 'DocumentType': '10-K',
 'ContextForDurations': 'P01_01_2015To12_31_2015',
 'NetCashFlowsOperatingContinuing': -1203064.0,
 'OtherComprehensiveIncome': 0.0,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest': 0,
 'NetCashFlowsInvestingContinuing': 111649.0,
 'NetIncomeAttributableToParent': 332612.0,
 'NetCashFlowsInvestingDiscontinued': 0,
 'ROE': 0.06652237339105065,
 'PreferredStockDividendsAndOtherAdjustments': 665224.0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments': 1109024.0,
 'NetCashFlowsOperating': -1203064.0,
 'CostsAndExpenses': 0,
 'CurrentAssets': 58654.0,
 'IncomeFromEquityMethodInvestments': 0,
 'NoncurrentAssets': 500647797.0,
 'EntityRegistrantName': 'WL Ross Holding Corp.',
 'IncomeTaxExpenseBenefit': 0,
 'CostOfRevenue': 0,
 'ExchangeGainsLosses': 0,
 'CurrentLiabilities': 765749.0,
 'Assets': 500706451.0,
 'NetCashFlowsDiscontinued': 0,
 'LiabilitiesAndEquity': 500706451.0,
 'OperatingIncomeLoss': -776412.0,
 'TemporaryEquity': 476631550.0,
 'NonoperatingIncomeLoss': 0,
 'OtherOperatingIncome': 0,
 'EquityAttributableToParent': 5000002.0,
 'GrossProfit': 0,
 'TradingSymbol': 'WLRH',
 'NetCashFlow': -791415.0,
 'DocumentFiscalYearFocus': '2015',
 'IncomeFromDiscontinuedOperations': 0,
 'NetCashFlowsInvesting': 111649.0,
 'ComprehensiveIncome': 332612.0,
 'Revenues': 0.0,
 'CommitmentsAndContingencies': 0,
 'OperatingExpenses': 0,
 'IncomeStatementPeriodYTD': '2015-01-01',
 'Liabilities': 19074899.0,
 'NetCashFlowsFinancingContinuing': 300000.0,
 'EntityCentralIndexKey': '0001604416',
 'EquityAttributableToNoncontrollingInterest': 0,
 'ComprehensiveIncomeAttributableToParent': 332612.0,
 'DocumentFiscalPeriodFocus': 'FY',
 'NetIncomeLoss': 332612.0,
 'IncomeBeforeEquityMethodInvestments': 332612.0,
 'NetCashFlowsOperatingDiscontinued': 0,
 'BalanceSheetDate': '2015-12-31',
 'NetCashFlowsFinancing': 300000.0,
 'ROA': 0.0006642854297876821,
 'ExtraordaryItemsGainLoss': 0,
 'IncomeFromContinuingOperationsAfterTax': 332612.0,
 'NetIncomeAttributableToNoncontrollingInterest': 0,
 'InterestAndDebtExpense': 0,
 'FiscalYear': '--12-31'
}

describe('parse-xrbl', function () {

  it('should parse the xbrl for WL Ross Holding Corp', function (done) {
    var wlRossHolingCorp10kOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/wl_ross_holding_corp_10k.xml');
    console.log('HERE', wlRossHolingCorp10kOutput)
    for (var key in wlRossHolingCorp10kOutput) {
      expect(wlRossHolingCorp10kOutput[key]).toBe('test');
    }
    done();
  })

})
