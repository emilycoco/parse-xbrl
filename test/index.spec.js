var ParseXbrl = require('../index.js');

var wlRossHolingCorp10kParsed = {
 'NetCashFlowsContinuing': -791415,
 'NetCashFlowsFinancingDiscontinued': 0,
 'NetIncomeAvailableToCommonStockholdersBasic': -332612,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense': 1109024,
 'NoncurrentLiabilities': 18309150,
 'IncomeFromContinuingOperationsBeforeTax': 332612,
 'ContextForInstants': 'PAsOn12_31_2015',
 'Equity': 5000002,
 'EntityFilerCategory': 'Accelerated Filer',
 'DocumentType': '10-K',
 'ContextForDurations': 'P01_01_2015To12_31_2015',
 'NetCashFlowsOperatingContinuing': -1203064,
 'OtherComprehensiveIncome': 0,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest': 0,
 'NetCashFlowsInvestingContinuing': 111649,
 'NetIncomeAttributableToParent': 332612,
 'NetCashFlowsInvestingDiscontinued': 0,
 'ROE': 0.06652237339105065,
 'PreferredStockDividendsAndOtherAdjustments': 665224,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments': 1109024,
 'NetCashFlowsOperating': -1203064,
 'CostsAndExpenses': 0,
 'CurrentAssets': 58654,
 'IncomeFromEquityMethodInvestments': 0,
 'NoncurrentAssets': 500647797,
 'EntityRegistrantName': 'WL Ross Holding Corp.',
 'IncomeTaxExpenseBenefit': 0,
 'CostOfRevenue': 0,
 'ExchangeGainsLosses': 0,
 'CurrentLiabilities': 765749,
 'Assets': 500706451,
 'NetCashFlowsDiscontinued': 0,
 'LiabilitiesAndEquity': 500706451,
 'OperatingIncomeLoss': -776412,
 'TemporaryEquity': 476631550,
 'NonoperatingIncomeLoss': 0,
 'OtherOperatingIncome': 0,
 'EquityAttributableToParent': 5000002,
 'GrossProfit': 0,
 'TradingSymbol': 'WLRH',
 'NetCashFlow': -791415,
 'DocumentFiscalYearFocus': '2015',
 'IncomeFromDiscontinuedOperations': 0,
 'NetCashFlowsInvesting': 111649,
 'ComprehensiveIncome': 332612,
 'Revenues': 0.0,
 'CommitmentsAndContingencies': 0,
 'OperatingExpenses': 0,
 'IncomeStatementPeriodYTD': '2015-01-01',
 'Liabilities': 19074899,
 'NetCashFlowsFinancingContinuing': 300000,
 'EntityCentralIndexKey': '0001604416',
 'EquityAttributableToNoncontrollingInterest': 0,
 'ComprehensiveIncomeAttributableToParent': 332612,
 'DocumentFiscalPeriodFocus': 'FY',
 'NetIncomeLoss': 332612,
 'IncomeBeforeEquityMethodInvestments': 332612,
 'NetCashFlowsOperatingDiscontinued': 0,
 'BalanceSheetDate': '2015-12-31',
 'NetCashFlowsFinancing': 300000,
 'ROA': 0.0006642854297876821,
 'ExtraordaryItemsGainLoss': 0,
 'IncomeFromContinuingOperationsAfterTax': 332612,
 'NetIncomeAttributableToNoncontrollingInterest': 0,
 'InterestAndDebtExpense': 0,
 'FiscalYear': '--12-31'
}

var amazon10kParsed = {
 'NetCashFlowsContinuing': 1707000000,
 'NetCashFlowsFinancingDiscontinued': 0,
 'NetIncomeAvailableToCommonStockholdersBasic': 596000000,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense': -665000000,
 'NoncurrentLiabilities': 18161000000,
 'IncomeFromContinuingOperationsBeforeTax': 1568000000,
 'ContextForInstants': 'FI2015Q4',
 'Equity': 13384000000,
 'EntityFilerCategory': 'Large Accelerated Filer',
 'DocumentType': '10-K',
 'ContextForDurations': 'FD2015Q4YTD',
 'NetCashFlowsOperatingContinuing': 11920000000,
 'OtherComprehensiveIncome': -212000000,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest': 0,
 'NetCashFlowsInvestingContinuing': -6450000000,
 'ROS': 0.0055697811337682,
 'NetIncomeAttributableToParent': 596000000,
 'SGR': 0.046606193306224585,
 'NetCashFlowsInvestingDiscontinued': 0,
 'ROE': 0.04453078302450687,
 'PreferredStockDividendsAndOtherAdjustments': 0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments': -665000000,
 'NetCashFlowsOperating': 11920000000,
 'CostsAndExpenses': 104773000000,
 'CurrentAssets': 36474000000,
 'IncomeFromEquityMethodInvestments': -22000000,
 'NoncurrentAssets': 28970000000.0,
 'EntityRegistrantName': 'AMAZON COM INC',
 'IncomeTaxExpenseBenefit': 950000000,
 'CostOfRevenue': 71651000000,
 'ExchangeGainsLosses': -374000000,
 'CurrentLiabilities': 33899000000,
 'Assets': 65444000000,
 'NetCashFlowsDiscontinued': 0,
 'LiabilitiesAndEquity': 65444000000,
 'OperatingIncomeLoss': 2233000000,
 'TemporaryEquity': 0,
 'NonoperatingIncomeLoss': -665000000,
 'OtherOperatingIncome': 0,
 'EquityAttributableToParent': 13384000000,
 'GrossProfit': 35355000000,
 'TradingSymbol': 'AMZN',
 'NetCashFlow': 1333000000,
 'DocumentFiscalYearFocus': '2015',
 'IncomeFromDiscontinuedOperations': 0,
 'NetCashFlowsInvesting': -6450000000,
 'ComprehensiveIncome': 384000000,
 'Revenues': 107006000000,
 'CommitmentsAndContingencies': 0,
 'OperatingExpenses': 33122000000,
 'IncomeStatementPeriodYTD': '2015-01-01',
 'Liabilities': 52060000000,
 'NetCashFlowsFinancingContinuing': -3763000000,
 'EntityCentralIndexKey': '0001018724',
 'EquityAttributableToNoncontrollingInterest': 0,
 'ComprehensiveIncomeAttributableToParent': 384000000,
 'DocumentFiscalPeriodFocus': 'FY',
 'NetIncomeLoss': 596000000,
 'IncomeBeforeEquityMethodInvestments': 1568000000,
 'NetCashFlowsOperatingDiscontinued': 0,
 'BalanceSheetDate': '2015-12-31',
 'NetCashFlowsFinancing': -3763000000,
 'ROA': 0.009107022798117474,
 'ExtraordaryItemsGainLoss': 0,
 'IncomeFromContinuingOperationsAfterTax': 596000000,
 'NetIncomeAttributableToNoncontrollingInterest': 0,
 'InterestAndDebtExpense': 0,
 'FiscalYear': '--12-31'
}

var cannabicsPharmaceuticals10kParsed = {
 'NetCashFlowsContinuing':0,
 'NetCashFlowsFinancingDiscontinued':0,
 'NetIncomeAvailableToCommonStockholdersBasic':-1279138,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense':0,
 'NoncurrentLiabilities':0,
 'IncomeFromContinuingOperationsBeforeTax':-1279138,
 'ContextForInstants':'AsOf2015-08-31',
 'Equity':-309626,
 'EntityFilerCategory':'Smaller Reporting Company',
 'DocumentType':'10-K',
 'ContextForDurations':'From2004-09-15to2015-08-31',
 'NetCashFlowsOperatingContinuing':0,
 'OtherComprehensiveIncome':0,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest':0,
 'NetCashFlowsInvestingContinuing':0,
 'NetIncomeAttributableToParent':-1279138,
 'NetCashFlowsInvestingDiscontinued':0,
 'ROE':4.131235748935813,
 'PreferredStockDividendsAndOtherAdjustments':0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments':0,
 'NetCashFlowsOperating':0,
 'CostsAndExpenses':0,
 'CurrentAssets':25503,
 'IncomeFromEquityMethodInvestments':0,
 'NoncurrentAssets':3201,
 'EntityRegistrantName':'Cannabics Pharmaceuticals Inc.',
 'IncomeTaxExpenseBenefit':0,
 'CostOfRevenue':0,
 'ExchangeGainsLosses':0,
 'CurrentLiabilities':338330,
 'Assets':28704,
 'NetCashFlowsDiscontinued':0,
 'LiabilitiesAndEquity':28704,
 'OperatingIncomeLoss':-1279138,
 'TemporaryEquity':0,
 'NonoperatingIncomeLoss':0,
 'OtherOperatingIncome':0,
 'EquityAttributableToParent':-309626,
 'GrossProfit':0,
 'TradingSymbol':'Field not found.',
 'NetCashFlow':0,
 'DocumentFiscalYearFocus':'2015',
 'IncomeFromDiscontinuedOperations':0,
 'NetCashFlowsInvesting':0,
 'ComprehensiveIncome':-1279138,
 'Revenues':0,
 'CommitmentsAndContingencies':0,
 'OperatingExpenses':0,
 'IncomeStatementPeriodYTD':'2004-09-15',
 'Liabilities':338330,
 'NetCashFlowsFinancingContinuing':0,
 'EntityCentralIndexKey':'0001343009',
 'EquityAttributableToNoncontrollingInterest':0,
 'ComprehensiveIncomeAttributableToParent':-1279138,
 'DocumentFiscalPeriodFocus':'FY',
 'NetIncomeLoss':-1279138,
 'IncomeBeforeEquityMethodInvestments':-1279138,
 'NetCashFlowsOperatingDiscontinued':0,
 'BalanceSheetDate':'2015-08-31',
 'NetCashFlowsFinancing':0,
 'ROA':-44.563057413600895,
 'ExtraordaryItemsGainLoss':0,
 'IncomeFromContinuingOperationsAfterTax':-1279138,
 'NetIncomeAttributableToNoncontrollingInterest':0,
 'InterestAndDebtExpense':0,
 'FiscalYear':'--08-31'
}

var costco10kParsed = {
  'NetCashFlowsContinuing':7001,
 'NetCashFlowsFinancingDiscontinued':0,
 'NetIncomeAvailableToCommonStockholdersBasic':-23719,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense':0,
 'NoncurrentLiabilities':0,
 'IncomeFromContinuingOperationsBeforeTax':-23719,
 'ContextForInstants':'I151130',
 'Equity':10164,
 'EntityFilerCategory':'Smaller Reporting Company',
 'DocumentType':'10-K',
 'ContextForDurations':'D141201_151130',
 'NetCashFlowsOperatingContinuing':-22999,
 'OtherComprehensiveIncome':0,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest':0,
 'NetCashFlowsInvestingContinuing':0,
 'NetIncomeAttributableToParent':-23719,
 'NetCashFlowsInvestingDiscontinued':0,
 'ROE':-2.3336284927194018,
 'PreferredStockDividendsAndOtherAdjustments':0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments':0,
 'NetCashFlowsOperating':-22999,
 'CostsAndExpenses':0,
 'CurrentAssets':0,
 'IncomeFromEquityMethodInvestments':0,
 'NoncurrentAssets':0,
 'EntityRegistrantName':'COSTO INC.',
 'IncomeTaxExpenseBenefit':0,
 'CostOfRevenue':0,
 'ExchangeGainsLosses':0,
 'CurrentLiabilities':0,
 'Assets':13641,
 'NetCashFlowsDiscontinued':0,
 'LiabilitiesAndEquity':13641,
 'OperatingIncomeLoss':-23719,
 'TemporaryEquity':0,
 'NonoperatingIncomeLoss':0,
 'OtherOperatingIncome':0,
 'EquityAttributableToParent':10164,
 'GrossProfit':0,
 'TradingSymbol':'csst',
 'NetCashFlow':7001,
 'DocumentFiscalYearFocus':'2015',
 'IncomeFromDiscontinuedOperations':0,
 'NetCashFlowsInvesting':0,
 'ComprehensiveIncome':-23719,
 'Revenues':0,
 'CommitmentsAndContingencies':0,
 'OperatingExpenses':23719,
 'IncomeStatementPeriodYTD':'2014-12-01',
 'Liabilities':3477,
 'NetCashFlowsFinancingContinuing':30000,
 'EntityCentralIndexKey':'0001621199',
 'EquityAttributableToNoncontrollingInterest':0,
 'ComprehensiveIncomeAttributableToParent':-23719,
 'DocumentFiscalPeriodFocus':'FY',
 'NetIncomeLoss':-23719,
 'IncomeBeforeEquityMethodInvestments':-23719,
 'NetCashFlowsOperatingDiscontinued':0,
 'BalanceSheetDate':'2015-11-30',
 'NetCashFlowsFinancing':30000,
 'ROA':-1.7388021406055274,
 'ExtraordaryItemsGainLoss':0,
 'IncomeFromContinuingOperationsAfterTax':-23719,
 'NetIncomeAttributableToNoncontrollingInterest':0,
 'InterestAndDebtExpense':0,
 'FiscalYear':'--11-30'
}

var transatlanticCapital10kParsed = {
 'NetCashFlowsContinuing':0,
 'NetCashFlowsFinancingDiscontinued':0,
 'NetIncomeAvailableToCommonStockholdersBasic':-312535,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense':-132776,
 'NoncurrentLiabilities':0,
 'IncomeFromContinuingOperationsBeforeTax':-312535,
 'ContextForInstants':'AsOf2014-12-31',
 'Equity':-144968,
 'EntityFilerCategory':'Smaller Reporting Company',
 'DocumentType':'10-K',
 'ContextForDurations':'From2014-01-01to2014-12-31',
 'NetCashFlowsOperatingContinuing':-69155,
 'OtherComprehensiveIncome':0,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest':0,
 'NetCashFlowsInvestingContinuing':0,
 'NetIncomeAttributableToParent':-312535,
 'NetCashFlowsInvestingDiscontinued':0,
 'ROE':2.155889575630484,
 'PreferredStockDividendsAndOtherAdjustments':0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments':-132776,
 'NetCashFlowsOperating':-69155,
 'CostsAndExpenses':0,
 'CurrentAssets':0,
 'IncomeFromEquityMethodInvestments':0,
 'NoncurrentAssets':0,
 'EntityRegistrantName':'TRANSATLANTIC CAPITAL INC.',
 'IncomeTaxExpenseBenefit':0,
 'CostOfRevenue':0,
 'ExchangeGainsLosses':0,
 'CurrentLiabilities':144968,
 'Assets':0,
 'NetCashFlowsDiscontinued':0,
 'LiabilitiesAndEquity':0,
 'OperatingIncomeLoss':-179759,
 'TemporaryEquity':0,
 'NonoperatingIncomeLoss':0,
 'OtherOperatingIncome':0,
 'EquityAttributableToParent':-144968,
 'GrossProfit':0,
 'TradingSymbol':'Field not found.',
 'NetCashFlow':0,
 'DocumentFiscalYearFocus':'2014',
 'IncomeFromDiscontinuedOperations':0,
 'NetCashFlowsInvesting':0,
 'ComprehensiveIncome':-312535,
 'Revenues':0,
 'CommitmentsAndContingencies':0,
 'OperatingExpenses':179759,
 'IncomeStatementPeriodYTD':'2014-01-01',
 'Liabilities':144968,
 'NetCashFlowsFinancingContinuing':69155,
 'EntityCentralIndexKey':'0001228386',
 'EquityAttributableToNoncontrollingInterest':0,
 'ComprehensiveIncomeAttributableToParent':-312535,
 'DocumentFiscalPeriodFocus':'FY',
 'NetIncomeLoss':-312535,
 'IncomeBeforeEquityMethodInvestments':-312535,
 'NetCashFlowsOperatingDiscontinued':0,
 'BalanceSheetDate':'2014-12-31',
 'NetCashFlowsFinancing':69155,
 'ExtraordaryItemsGainLoss':0,
 'IncomeFromContinuingOperationsAfterTax':-312535,
 'NetIncomeAttributableToNoncontrollingInterest':0,
 'InterestAndDebtExpense':0,
 'FiscalYear':'--12-31'
}

var sweetsAndTreats10qParsed = {
  'NetCashFlowsContinuing':-47,
 'NetCashFlowsFinancingDiscontinued':0,
 'NetIncomeAvailableToCommonStockholdersBasic':-2065,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense':0,
 'NoncurrentLiabilities':0,
 'IncomeFromContinuingOperationsBeforeTax':-2065,
 'ContextForInstants':'AsOf2015-10-31',
 'Equity':-34509,
 'EntityFilerCategory':'Smaller Reporting Company',
 'DocumentType':'10-Q',
 'ContextForDurations':'From2015-08-01to2015-10-31',
 'NetCashFlowsOperatingContinuing':-18706,
 'OtherComprehensiveIncome':0,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest':0,
 'NetCashFlowsInvestingContinuing':0,
 'ROS':-13.49673202614379,
 'NetIncomeAttributableToParent':-2065,
 'SGR':0.0636481321661941,
 'NetCashFlowsInvestingDiscontinued':0,
 'ROE':0.05983946216928917,
 'PreferredStockDividendsAndOtherAdjustments':0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments':0,
 'NetCashFlowsOperating':-18706,
 'CostsAndExpenses':2218,
 'CurrentAssets':5806,
 'IncomeFromEquityMethodInvestments':0,
 'NoncurrentAssets':0,
 'EntityRegistrantName':'SWEETS & TREATS INC.',
 'IncomeTaxExpenseBenefit':0,
 'CostOfRevenue':99,
 'ExchangeGainsLosses':0,
 'CurrentLiabilities':40315,
 'Assets':5806,
 'NetCashFlowsDiscontinued':0,
 'LiabilitiesAndEquity':5806,
 'OperatingIncomeLoss':-2065,
 'TemporaryEquity':0,
 'NonoperatingIncomeLoss':0,
 'OtherOperatingIncome':0,
 'EquityAttributableToParent':-34509,
 'GrossProfit':54,
 'TradingSymbol':'Field not found.',
 'NetCashFlow':-47,
 'DocumentFiscalYearFocus':'2016',
 'IncomeFromDiscontinuedOperations':0,
 'NetCashFlowsInvesting':0,
 'ComprehensiveIncome':-2065,
 'Revenues':153,
 'CommitmentsAndContingencies':0,
 'OperatingExpenses':2119,
 'IncomeStatementPeriodYTD':'2015-08-01',
 'Liabilities':40315,
 'NetCashFlowsFinancingContinuing':18659,
 'EntityCentralIndexKey':'0001624982',
 'EquityAttributableToNoncontrollingInterest':0,
 'ComprehensiveIncomeAttributableToParent':-2065,
 'DocumentFiscalPeriodFocus':'Q1',
 'NetIncomeLoss':-2065,
 'IncomeBeforeEquityMethodInvestments':-2065,
 'NetCashFlowsOperatingDiscontinued':0,
 'BalanceSheetDate':'2015-10-31',
 'NetCashFlowsFinancing':18659,
 'ROA':-0.3556665518429211,
 'ExtraordaryItemsGainLoss':0,
 'IncomeFromContinuingOperationsAfterTax':-2065,
 'NetIncomeAttributableToNoncontrollingInterest':0,
 'InterestAndDebtExpense':0,
 'FiscalYear':'--07-31'
}

var rubyTuesday10qParsed = {
  'NetCashFlowsContinuing':-30080000,
 'NetCashFlowsFinancingDiscontinued':0,
 'NetIncomeAvailableToCommonStockholdersBasic':-19993000,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense':-59956000,
 'NoncurrentLiabilities':347905000,
 'IncomeFromContinuingOperationsBeforeTax':-21196000,
 'ContextForInstants':'i_2015-12-01',
 'Equity':446822000,
 'EntityFilerCategory':'Accelerated Filer',
 'DocumentType':'10-Q',
 'ContextForDurations':'d_2015-06-03_2015-12-01',
 'NetCashFlowsOperatingContinuing':-4131000,
 'OtherComprehensiveIncome':462000,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest':0,
 'NetCashFlowsInvestingContinuing':-16310000,
 'ROS':-0.036994204679184954,
 'NetIncomeAttributableToParent':-19993000,
 'SGR':-0.04282852950312222,
 'NetCashFlowsInvestingDiscontinued':0,
 'ROE':-0.04474488722578566,
 'PreferredStockDividendsAndOtherAdjustments':0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments':-59956000,
 'NetCashFlowsOperating':-4131000,
 'CostsAndExpenses':561632000,
 'CurrentAssets':99598000,
 'IncomeFromEquityMethodInvestments':0,
 'NoncurrentAssets':784520000,
 'EntityRegistrantName':'RUBY TUESDAY INC',
 'IncomeTaxExpenseBenefit':-1203000,
 'CostOfRevenue':0,
 'ExchangeGainsLosses':0,
 'CurrentLiabilities':89391000,
 'Assets':884118000,
 'NetCashFlowsDiscontinued':0,
 'LiabilitiesAndEquity':884118000,
 'OperatingIncomeLoss':38760000,
 'TemporaryEquity':0,
 'NonoperatingIncomeLoss':0,
 'OtherOperatingIncome':0,
 'EquityAttributableToParent':446822000,
 'GrossProfit':0,
 'TradingSymbol':'rt',
 'NetCashFlow':-30080000,
 'DocumentFiscalYearFocus':'2016',
 'IncomeFromDiscontinuedOperations':0,
 'NetCashFlowsInvesting':-16310000,
 'ComprehensiveIncome':-19531000,
 'Revenues':540436000,
 'CommitmentsAndContingencies':0,
 'OperatingExpenses':0,
 'IncomeStatementPeriodYTD':'2015-06-03',
 'Liabilities':437296000,
 'NetCashFlowsFinancingContinuing':-9639000,
 'EntityCentralIndexKey':'0000068270',
 'EquityAttributableToNoncontrollingInterest':0,
 'ComprehensiveIncomeAttributableToParent':-19531000,
 'DocumentFiscalPeriodFocus':'Q2',
 'NetIncomeLoss':-19993000,
 'IncomeBeforeEquityMethodInvestments':-21196000,
 'NetCashFlowsOperatingDiscontinued':0,
 'BalanceSheetDate':'2015-12-01',
 'NetCashFlowsFinancing':-9639000,
 'ROA':-0.02261349729334772,
 'ExtraordaryItemsGainLoss':0,
 'IncomeFromContinuingOperationsAfterTax':-19993000,
 'NetIncomeAttributableToNoncontrollingInterest':0,
 'InterestAndDebtExpense':0,
 'FiscalYear':'--05-31'
}

var google10kParsed = {
 'NetCashFlowsContinuing':-1364000000 ,
 'NetCashFlowsFinancingDiscontinued':0,
 'NetIncomeAvailableToCommonStockholdersBasic':15826000000,
 'NonoperatingIncomeLossPlusInterestAndDebtExpense':291000000,
 'NoncurrentLiabilities':7820000000,
 'IncomeFromContinuingOperationsBeforeTax':19651000000,
 'ContextForInstants':'FI2015Q4',
 'Equity':120331000000,
 'EntityFilerCategory':'Large Accelerated Filer',
 'DocumentType':'10-K',
 'ContextForDurations':'FD2015Q4YTD',
 'NetCashFlowsOperatingContinuing':26024000000,
 'OtherComprehensiveIncome':-1901000000,
 'ComprehensiveIncomeAttributableToNoncontrollingInterest':0,
 'NetCashFlowsInvestingContinuing':-23711000000,
 'ROS':0.21800530744509194,
 'NetIncomeAttributableToParent':16348000000,
 'SGR':0.15721800678957132,
 'NetCashFlowsInvestingDiscontinued':0,
 'ROE':0.13585859005576287,
 'PreferredStockDividendsAndOtherAdjustments':0,
 'NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments':291000000,
 'NetCashFlowsOperating':26024000000,
 'CostsAndExpenses':55629000000,
 'CurrentAssets':90114000000,
 'IncomeFromEquityMethodInvestments':0,
 'NoncurrentAssets':57347000000,
 'EntityRegistrantName':'Alphabet Inc.',
 'IncomeTaxExpenseBenefit':3303000000,
 'CostOfRevenue':0,
 'ExchangeGainsLosses':0,
 'CurrentLiabilities':19310000000,
 'Assets':147461000000,
 'NetCashFlowsDiscontinued':0,
 'LiabilitiesAndEquity':147461000000,
 'OperatingIncomeLoss':19360000000,
 'TemporaryEquity':0,
 'NonoperatingIncomeLoss':0,
 'OtherOperatingIncome':0,
 'EquityAttributableToParent':120331000000,
 'GrossProfit':0,
 'TradingSymbol':'GOOG, GOOGL',
 'NetCashFlow':-1798000000,
 'DocumentFiscalYearFocus':'2015',
 'IncomeFromDiscontinuedOperations':0,
 'NetCashFlowsInvesting':-23711000000,
 'ComprehensiveIncome':14447000000,
 'Revenues':74989000000,
 'CommitmentsAndContingencies':0,
 'OperatingExpenses':0,
 'IncomeStatementPeriodYTD':'2015-01-01',
 'Liabilities':27130000000,
 'NetCashFlowsFinancingContinuing':-3677000000,
 'EntityCentralIndexKey':'0001652044',
 'EquityAttributableToNoncontrollingInterest':0,
 'ComprehensiveIncomeAttributableToParent':14447000000,
 'DocumentFiscalPeriodFocus':'FY',
 'NetIncomeLoss':16348000000,
 'IncomeBeforeEquityMethodInvestments':19651000000,
 'NetCashFlowsOperatingDiscontinued':0,
 'BalanceSheetDate':'2015-12-31',
 'NetCashFlowsFinancing':-3677000000,
 'ROA':0.11086321128976476,
 'ExtraordaryItemsGainLoss':0,
 'IncomeFromContinuingOperationsAfterTax':16348000000,
 'NetIncomeAttributableToNoncontrollingInterest':0,
 'InterestAndDebtExpense':0
}

describe('parse-xbrl', function () {

  it('should parse the xbrl for Amazon 10k', function (done) {
    var amazon10kOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/amazon_10k.xml');
    amazon10kOutput.then(function(results) {
      for (var key in results) {
        if (amazon10kParsed[key]) {
          expect(results[key]).toBe(amazon10kParsed[key]);
          done();
        }
      }
    })
  })

  it('should parse the xbrl for Cannabics Pharmaceuticals Inc. 10k', function (done) {
    var cannabicsPharmaceuticals10kOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/cannabics_pharmaceuticals_inc_10k.xml');
    cannabicsPharmaceuticals10kOutput.then(function(results) {
      for (var key in results) {
        if (cannabicsPharmaceuticals10kParsed[key]) {
          expect(results[key]).toBe(cannabicsPharmaceuticals10kParsed[key]);
          done();
        }
      }
    })
  })

  it('should parse the xbrl for Costco Inc. 10k', function (done) {
    var costco10kOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/costco_inc_10k.xml');
    costco10kOutput.then(function(results) {
      for (var key in results) {
        if (costco10kParsed[key]) {
          expect(results[key]).toBe(costco10kParsed[key]);
          done();
        }
      }
    })
  })

  it('should parse the xbrl for Transatlantic Capital Inc. 10k', function (done) {
    var transatlanticCapital10kOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/transatlantic_capital_inc_10k.xml');
    transatlanticCapital10kOutput.then(function(results) {
      for (var key in results) {
        if (transatlanticCapital10kParsed[key]) {
          expect(results[key]).toBe(transatlanticCapital10kParsed[key]);
          done();
        }
      }
    })
  })

  it('should parse the xbrl for WL Ross Holding Corp 10k', function (done) {
    var wlRossHolingCorp10kOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/wl_ross_holding_corp_10k.xml');
    wlRossHolingCorp10kOutput.then(function(results) {
      for (var key in results) {
        if (wlRossHolingCorp10kParsed[key]) {
          expect(results[key]).toBe(wlRossHolingCorp10kParsed[key]);
          done();
        }
      }
    })
  })

  it('should parse the xbrl for Sweets and Treats 10q', function (done) {
    var sweetsAndTreats10qOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/sweets_and_treats_10q.xml');
    sweetsAndTreats10qOutput.then(function(results) {
      for (var key in results) {
        if (sweetsAndTreats10qParsed[key]) {
          expect(results[key]).toBe(sweetsAndTreats10qParsed[key]);
          done();
        }
      }
    })
  })

  it('should parse the xbrl for Ruby Tuesday 10q', function (done) {
    var rubyTuesday10qOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/ruby_tuesday_10q.xml');
    rubyTuesday10qOutput.then(function(results) {
      for (var key in results) {
        if (rubyTuesday10qParsed[key]) {
          expect(results[key]).toBe(rubyTuesday10qParsed[key]);
          done();
        }
      }
    })
  })
  
  it('should parse the xbrl for Google/Alphabet 10k', function (done) {
    var google10kOutput = ParseXbrl.parse('./test/sampleXbrlDocuments/google_10k.xml');
    google10kOutput.then(function(results) {
      for (var key in results) {
        if (google10kParsed[key]) {
          expect(results[key]).toBe(google10kParsed[key]);
          done();
        }
      }
    })
  })

})
