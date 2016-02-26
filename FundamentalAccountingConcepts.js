function load(xbrlDoc) {
    var self = this;
    self.xbrl = xbrlDoc;

    console.log('FUNDAMENTAL ACCOUNTING CONCEPTS:');
    console.log('Entity registrant name: ' + self.xbrl.fields['EntityRegistrantName']);
    console.log('CIK: ' + self.xbrl.fields['EntityCentralIndexKey']);
    console.log('Entity filer category: ' + self.xbrl.fields['EntityFilerCategory']);
    console.log('Trading symbol: ' + self.xbrl.fields['TradingSymbol']);
    console.log('Fiscal year: ' + self.xbrl.fields['DocumentFiscalYearFocus']);
    console.log('Fiscal period: ' + self.xbrl.fields['DocumentFiscalPeriodFocus']);
    console.log('Document type: ' + self.xbrl.fields['DocumentType']);
    console.log('Balance Sheet Date (document period end date): ' + self.xbrl.fields['DocumentPeriodEndDate']);
    console.log('Income Statement Period (YTD, current period, period start date): ' + self.xbrl.fields['IncomeStatementPeriodYTD'] + ' to ' + self.xbrl.fields['BalanceSheetDate']);
    console.log('Context ID for document period focus (instants): ' + self.xbrl.fields['ContextForInstants']);
    console.log('Context ID for YTD period (durations): ' + self.xbrl.fields['ContextForDurations']);

    // Assets
    self.xbrl.fields['Assets'] = self.xbrl.getFactValue('us-gaap:Assets', 'Instant') || 0;

    // Current Assets
    self.xbrl.fields['CurrentAssets'] = self.xbrl.getFactValue('us-gaap:AssetsCurrent', 'Instant') || 0;

    // Noncurrent Assets
    self.xbrl.fields['NoncurrentAssets'] = self.xbrl.getFactValue('us-gaap:AssetsNoncurrent', 'Instant');
    if (self.xbrl.fields['NoncurrentAssets'] === null) {
        if (self.xbrl.fields['Assets'] && self.xbrl.fields['CurrentAssets']) {
            self.xbrl.fields['NoncurrentAssets'] = self.xbrl.fields['Assets'] - self.xbrl.fields['CurrentAssets'];
        } else {
            self.xbrl.fields['NoncurrentAssets'] = 0;
        }
    }

    // LiabilitiesAndEquity
    self.xbrl.fields['LiabilitiesAndEquity'] = self.xbrl.getFactValue('us-gaap:LiabilitiesAndStockholdersEquity', 'Instant');
    if (self.xbrl.fields['LiabilitiesAndEquity'] === null) {
        self.xbrl.fields['LiabilitiesAndEquity'] = self.xbrl.getFactValue('us-gaap:LiabilitiesAndPartnersCapital', 'Instant');
        if (self.xbrl.fields['LiabilitiesAndEquity']) {
            self.xbrl.fields['LiabilitiesAndEquity'] = 0;
        }
    }

    // Liabilities
    self.xbrl.fields['Liabilities'] = self.xbrl.getFactValue('us-gaap:Liabilities', 'Instant') || 0;

    // CurrentLiabilities
    self.xbrl.fields['CurrentLiabilities'] = self.xbrl.getFactValue('us-gaap:LiabilitiesCurrent', 'Instant') || 0;

    // Noncurrent Liabilities
    self.xbrl.fields['NoncurrentLiabilities'] = self.xbrl.getFactValue('us-gaap:LiabilitiesNoncurrent', 'Instant');
    if (self.xbrl.fields['NoncurrentLiabilities'] === null) {
        if (self.xbrl.fields['Liabilities'] && self.xbrl.fields['CurrentLiabilities']) {
            self.xbrl.fields['NoncurrentLiabilities'] = self.xbrl.fields['Liabilities'] - self.xbrl.fields['CurrentLiabilities']
        } else {
            self.xbrl.fields['NoncurrentLiabilities'] = 0;
        }
    }

    // CommitmentsAndContingencies
    self.xbrl.fields['CommitmentsAndContingencies'] = self.xbrl.getFactValue('us-gaap:CommitmentsAndContingencies', 'Instant') || 0;

    // TemporaryEquity
    self.xbrl.fields['TemporaryEquity'] = self.xbrl.getFactValue('us-gaap:TemporaryEquityRedemptionValue', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:RedeemablePreferredStockCarryingAmount', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:TemporaryEquityCarryingAmount', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:TemporaryEquityValueExcludingAdditionalPaidInCapital', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:TemporaryEquityCarryingAmountAttributableToParent', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:RedeemableNoncontrollingInterestEquityFairValue', 'Instant') || 0;

    // RedeemableNoncontrollingInterest (added to temporary equity)
    var redeemableNoncontrollingInterest = self.xbrl.getFactValue('us-gaap:RedeemableNoncontrollingInterestEquityCarryingAmount', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:RedeemableNoncontrollingInterestEquityCommonCarryingAmount', 'Instant') || 0;

    // This adds redeemable noncontrolling interest and temporary equity which are rare, but can be reported seperately
    if (self.xbrl.fields['TemporaryEquity']) {
        self.xbrl.fields['TemporaryEquity'] = Number(self.xbrl.fields['TemporaryEquity']) + Number(redeemableNoncontrollingInterest);
    }

    // Equity
    self.xbrl.fields['Equity'] = self.xbrl.getFactValue('us-gaap:StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:StockholdersEquity', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:PartnersCapitalIncludingPortionAttributableToNoncontrollingInterest', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:PartnersCapital', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:CommonStockholdersEquity', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:MemberEquity', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:AssetsNet', 'Instant') || 0;


    // EquityAttributableToNoncontrollingInterest
    self.xbrl.fields['EquityAttributableToNoncontrollingInterest'] = self.xbrl.getFactValue('us-gaap:MinorityInterest', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:PartnersCapitalAttributableToNoncontrollingInterest', 'Instant') || 0;

    // EquityAttributableToParent
    self.xbrl.fields['EquityAttributableToParent'] = self.xbrl.getFactValue('us-gaap:StockholdersEquity', 'Instant') ||
    self.xbrl.getFactValue('us-gaap:LiabilitiesAndPartnersCapital', 'Instant') || 0;

    // BS Adjustments
    // If total assets is missing, try using current assets
    if (self.xbrl.fields['Assets'] === 0 &&
        self.xbrl.fields['Assets'] === self.xbrl.fields['LiabilitiesAndEquity'] &&
        self.xbrl.fields['CurrentAssets'] === self.xbrl.fields['LiabilitiesAndEquity']) {
        self.xbrl.fields['Assets'] = self.xbrl.fields['CurrentAssets'];
    }

    // Added to fix Assets
    if (self.xbrl.fields['Assets'] === 0 &&
        self.xbrl.fields['LiabilitiesAndEquity'] !== 0 &&
        self.xbrl.fields['CurrentAssets'] === self.xbrl.fields['LiabilitiesAndEquity']) {
        self.xbrl.fields['Assets'] = self.xbrl.fields['CurrentAssets'];
    }

    // Added to fix Assets even more
    if (self.xbrl.fields['Assets'] === 0 &&
        self.xbrl.fields['NoncurrentAssets'] === 0 &&
        self.xbrl.fields['LiabilitiesAndEquity'] !== 0 &&
        (self.xbrl.fields['LiabilitiesAndEquity'] === self.xbrl.fields['Liabilities'] + self.xbrl.fields['Equity'])) {
            self.xbrl.fields['Assets'] = self.xbrl.fields['CurrentAssets'];
        }

    if (self.xbrl.fields['Assets'] !== 0 && self.xbrl.fields['CurrentAssets']!== 0) {
        self.xbrl.fields['NoncurrentAssets'] = self.xbrl.fields['Assets'] - self.xbrl.fields['CurrentAssets'];
    }

    if (self.xbrl.fields['LiabilitiesAndEquity'] === 0 && self.xbrl.fields['Assets'] !== 0) {
        self.xbrl.fields['LiabilitiesAndEquity'] = self.xbrl.fields['Assets'];
    }

    // Impute: Equity based no parent and noncontrolling interest being present
    if (self.xbrl.fields['EquityAttributableToNoncontrollingInterest']!== 0 && self.xbrl.fields['EquityAttributableToParent']!== 0) {
        self.xbrl.fields['Equity'] = self.xbrl.fields['EquityAttributableToParent'] + self.xbrl.fields['EquityAttributableToNoncontrollingInterest'];
    }

    if (self.xbrl.fields['Equity'] === 0 && self.xbrl.fields['EquityAttributableToNoncontrollingInterest'] === 0 && self.xbrl.fields['EquityAttributableToParent'] !== 0) {
        self.xbrl.fields['Equity'] = self.xbrl.fields['EquityAttributableToParent'];
    }

    if (self.xbrl.fields['Equity'] === 0) {
        self.xbrl.fields['Equity'] = self.xbrl.fields['EquityAttributableToParent'] + self.xbrl.fields['EquityAttributableToNoncontrollingInterest'];
    }

    // Added: Impute Equity attributable to parent based on existence of equity and noncontrolling interest.
    if (self.xbrl.fields['Equity'] !==0 &&
        self.xbrl.fields['EquityAttributableToNoncontrollingInterest'] !== 0 &&
        self.xbrl.fields['EquityAttributableToParent'] === 0) {
        self.xbrl.fields['EquityAttributableToParent'] = self.xbrl.fields['Equity'] - self.xbrl.fields['EquityAttributableToNoncontrollingInterest'];
    }

    // Added: Impute Equity attributable to parent based on existence of equity and noncontrolling interest.
    if (self.xbrl.fields['Equity'] !== 0 &&
        self.xbrl.fields['EquityAttributableToNoncontrollingInterest'] === 0 &&
        self.xbrl.fields['EquityAttributableToParent'] === 0) {
        self.xbrl.fields['EquityAttributableToParent'] = self.xbrl.fields['Equity'];
    }

    // if total liabilities is missing, figure it out based on liabilities and equity
    if (self.xbrl.fields['Liabilities'] === 0 && self.xbrl.fields['Equity'] !== 0) {
        self.xbrl.fields['Liabilities'] = self.xbrl.fields['LiabilitiesAndEquity'] - (self.xbrl.fields['CommitmentsAndContingencies'] + self.xbrl.fields['TemporaryEquity'] + self.xbrl.fields['Equity']);
    }

    // This seems incorrect because liabilities might not be reported
    if (self.xbrl.fields['Liabilities']!== 0 &&
        self.xbrl.fields['CurrentLiabilities'] !== 0) {
        self.xbrl.fields['NoncurrentLiabilities'] = self.xbrl.fields['Liabilities'] - self.xbrl.fields['CurrentLiabilities'];
    }

    // Added to fix liabilities based on current liabilities
    if (self.xbrl.fields['Liabilities'] === 0 &&
        self.xbrl.fields['CurrentLiabilities'] !== 0 &&
        self.xbrl.fields['NoncurrentLiabilities'] === 0) {
        self.xbrl.fields['Liabilities'] = self.xbrl.fields['CurrentLiabilities'];
    }

    var lngBSCheck1 = self.xbrl.fields['Equity'] - (self.xbrl.fields['EquityAttributableToParent'] + self.xbrl.fields['EquityAttributableToNoncontrollingInterest']);
    var lngBSCheck2 = self.xbrl.fields['Assets'] - self.xbrl.fields['LiabilitiesAndEquity'];
    var lngBSCheck3;
    var lngBSCheck4;
    var lngBSCheck5;


    if (self.xbrl.fields['CurrentAssets'] === 0 &&
        self.xbrl.fields['NoncurrentAssets'] === 0 &&
        self.xbrl.fields['CurrentLiabilities'] === 0 &&
        self.xbrl.fields['NoncurrentLiabilities'] === 0) {

        // If current assets/liabilities are zero and noncurrent assets/liabilities;: don't do this test because the balance sheet is not classified
        lngBSCheck3 = 0;
        lngBSCheck4 = 0;
    } else {

        // Balance sheet IS classified
        lngBSCheck3 = self.xbrl.fields['Assets'] - (self.xbrl.fields['CurrentAssets'] + self.xbrl.fields['NoncurrentAssets']);
        lngBSCheck4 = self.xbrl.fields['Liabilities'] - (self.xbrl.fields['CurrentLiabilities'] + self.xbrl.fields['NoncurrentLiabilities']);
    }

    lngBSCheck5 = self.xbrl.fields['LiabilitiesAndEquity'] - (self.xbrl.fields['Liabilities'] + self.xbrl.fields['CommitmentsAndContingencies'] + self.xbrl.fields['TemporaryEquity'] + self.xbrl.fields['Equity']);

    if (lngBSCheck1) {
        console.log('BS1: Equity(' +
            self.xbrl.fields['Equity'] +
            ') = EquityAttributableToParent(' +
            self.xbrl.fields['EquityAttributableToParent'] +
            ') , EquityAttributableToNoncontrollingInterest(' +
            self.xbrl.fields['EquityAttributableToNoncontrollingInterest'] +
            '): ' +
            lngBSCheck1);
    }
    if (lngBSCheck2) {
        console.log('BS2: Assets(' +
            self.xbrl.fields['Assets'] +
            ') = LiabilitiesAndEquity(' +
            self.xbrl.fields['LiabilitiesAndEquity'] +
            '): ' +
            lngBSCheck2);
    }
    if (lngBSCheck3) {
        console.log('BS3: Assets(' +
            self.xbrl.fields['Assets'] +
            ') = CurrentAssets(' +
            self.xbrl.fields['CurrentAssets'] +
            ') + NoncurrentAssets(' +
            self.xbrl.fields['NoncurrentAssets'] +
            '): ' +
            lngBSCheck3);
    }
    if (lngBSCheck4) {
        console.log('BS4: Liabilities(' +
            self.xbrl.fields['Liabilities'] +
            ')= CurrentLiabilities(' +
            self.xbrl.fields['CurrentLiabilities'] +
            ') + NoncurrentLiabilities(' +
            self.xbrl.fields['NoncurrentLiabilities'] +
            '): ' +
            lngBSCheck4);
    }
    if (lngBSCheck5) {
        console.log('BS5: Liabilities and Equity(' +
            self.xbrl.fields['LiabilitiesAndEquity'] +
            ')= Liabilities(' +
            self.xbrl.fields['Liabilities'] +
            ') + CommitmentsAndContingencies(' +
            self.xbrl.fields['CommitmentsAndContingencies'] +
            ')+ TemporaryEquity(' +
            self.xbrl.fields['TemporaryEquity'] +
            ')+ Equity(' +
            self.xbrl.fields['Equity'] +
            '): ' +
            lngBSCheck5);
    }

    // Revenues
    self.xbrl.fields['Revenues'] = self.xbrl.getFactValue("us-gaap:Revenues", "Duration") ||
    self.xbrl.getFactValue("us-gaap:SalesRevenueNet", "Duration") ||
    self.xbrl.getFactValue("us-gaap:SalesRevenueServicesNet", "Duration") ||
    self.xbrl.getFactValue("us-gaap:RevenuesNetOfInterestExpense", "Duration") ||
    self.xbrl.getFactValue("us-gaap:RegulatedAndUnregulatedOperatingRevenue", "Duration") ||
    self.xbrl.getFactValue("us-gaap:HealthCareOrganizationRevenue", "Duration") ||
    self.xbrl.getFactValue("us-gaap:InterestAndDividendIncomeOperating", "Duration") ||
    self.xbrl.getFactValue("us-gaap:RealEstateRevenueNet", "Duration") ||
    self.xbrl.getFactValue("us-gaap:RevenueMineralSales", "Duration") ||
    self.xbrl.getFactValue("us-gaap:OilAndGasRevenue", "Duration") ||
    self.xbrl.getFactValue("us-gaap:FinancialServicesRevenue", "Duration") ||
    self.xbrl.getFactValue("us-gaap:RegulatedAndUnregulatedOperatingRevenue", "Duration") || 0;

    // CostOfRevenue
    self.xbrl.fields['CostOfRevenue'] = self.xbrl.getFactValue("us-gaap:CostOfRevenue", "Duration") ||
    self.xbrl.getFactValue("us-gaap:CostOfServices", "Duration") ||
    self.xbrl.getFactValue("us-gaap:CostOfGoodsSold", "Duration") ||
    self.xbrl.getFactValue("us-gaap:CostOfGoodsAndServicesSold", "Duration") || 0;

    // GrossProfit
    self.xbrl.fields['GrossProfit'] = self.xbrl.getFactValue("us-gaap:GrossProfit", "Duration") ||
    self.xbrl.getFactValue("us-gaap:GrossProfit", "Duration") || 0;

    // OperatingExpenses
    self.xbrl.fields['OperatingExpenses'] = self.xbrl.getFactValue("us-gaap:OperatingExpenses", "Duration") ||
    self.xbrl.getFactValue("us-gaap:OperatingCostsAndExpenses", "Duration") || 0;

    // CostsAndExpenses
    self.xbrl.fields['CostsAndExpenses'] = self.xbrl.getFactValue("us-gaap:CostsAndExpenses", "Duration") ||
    self.xbrl.getFactValue("us-gaap:CostsAndExpenses", "Duration") || 0;

    // OtherOperatingIncome
    self.xbrl.fields['OtherOperatingIncome'] = self.xbrl.getFactValue("us-gaap:OtherOperatingIncome", "Duration") ||
    self.xbrl.getFactValue("us-gaap:OtherOperatingIncome", "Duration") || 0;

    // OperatingIncomeLoss
    self.xbrl.fields['OperatingIncomeLoss'] = self.xbrl.getFactValue("us-gaap:OperatingIncomeLoss", "Duration") ||
    self.xbrl.getFactValue("us-gaap:OperatingIncomeLoss", "Duration") || 0;

    // NonoperatingIncomeLoss
    self.xbrl.fields['NonoperatingIncomeLoss'] = self.xbrl.getFactValue("us-gaap:NonoperatingIncomeExpense", "Duration") ||
    self.xbrl.getFactValue("us-gaap:NonoperatingIncomeExpense", "Duration") || 0;

    // InterestAndDebtExpense
    self.xbrl.fields['InterestAndDebtExpense'] = self.xbrl.getFactValue("us-gaap:InterestAndDebtExpense", "Duration") ||
    self.xbrl.getFactValue("us-gaap:InterestAndDebtExpense", "Duration") || 0;

    // IncomeBeforeEquityMethodInvestments
    self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] = self.xbrl.getFactValue("us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments", "Duration") || 0;

    // IncomeFromEquityMethodInvestments
    self.xbrl.fields['IncomeFromEquityMethodInvestments'] = self.xbrl.getFactValue("us-gaap:IncomeLossFromEquityMethodInvestments", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossFromEquityMethodInvestments", "Duration") || 0;

    // IncomeFromContinuingOperationsBeforeTax
    self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] = self.xbrl.getFactValue("us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest", "Duration") || 0;

    // IncomeTaxExpenseBenefit
    self.xbrl.fields['IncomeTaxExpenseBenefit'] = self.xbrl.getFactValue("us-gaap:IncomeTaxExpenseBenefit", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeTaxExpenseBenefitContinuingOperations", "Duration") || 0;

    // IncomeFromContinuingOperationsAfterTax
    self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] = self.xbrl.getFactValue("us-gaap:IncomeLossBeforeExtraordinaryItemsAndCumulativeEffectOfChangeInAccountingPrinciple", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossBeforeExtraordinaryItemsAndCumulativeEffectOfChangeInAccountingPrinciple", "Duration") || 0;


    // IncomeFromDiscontinuedOperations
    self.xbrl.fields['IncomeFromDiscontinuedOperations'] = self.xbrl.getFactValue("us-gaap:IncomeLossFromDiscontinuedOperationsNetOfTax", "Duration") ||
    self.xbrl.getFactValue("us-gaap:DiscontinuedOperationGainLossOnDisposalOfDiscontinuedOperationNetOfTax", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossFromDiscontinuedOperationsNetOfTaxAttributableToReportingEntity", "Duration") || 0;

    // ExtraordaryItemsGainLoss
    self.xbrl.fields['ExtraordaryItemsGainLoss'] = self.xbrl.getFactValue("us-gaap:ExtraordinaryItemNetOfTax", "Duration") ||
    self.xbrl.getFactValue("us-gaap:ExtraordinaryItemNetOfTax", "Duration") || 0;

    // NetIncomeLoss
    self.xbrl.fields['NetIncomeLoss'] = self.xbrl.getFactValue("us-gaap:ProfitLoss", "Duration") ||
    self.xbrl.getFactValue("us-gaap:NetIncomeLoss", "Duration") ||
    self.xbrl.getFactValue("us-gaap:NetIncomeLossAvailableToCommonStockholdersBasic", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossFromContinuingOperations", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossAttributableToParent", "Duration") ||
    self.xbrl.getFactValue("us-gaap:IncomeLossFromContinuingOperationsIncludingPortionAttributableToNoncontrollingInterest", "Duration") || 0;

    // NetIncomeAvailableToCommonStockholdersBasic
    self.xbrl.fields['NetIncomeAvailableToCommonStockholdersBasic'] = self.xbrl.getFactValue("us-gaap:NetIncomeLossAvailableToCommonStockholdersBasic", "Duration") || 0;

    // #PreferredStockDividendsAndOtherAdjustments
    self.xbrl.fields['PreferredStockDividendsAndOtherAdjustments'] = self.xbrl.getFactValue("us-gaap:PreferredStockDividendsAndOtherAdjustments", "Duration") || 0;

    // #NetIncomeAttributableToNoncontrollingInterest
    self.xbrl.fields['NetIncomeAttributableToNoncontrollingInterest'] = self.xbrl.getFactValue("us-gaap:NetIncomeLossAttributableToNoncontrollingInterest", "Duration") || 0;

    // #NetIncomeAttributableToParent
    self.xbrl.fields['NetIncomeAttributableToParent'] = self.xbrl.getFactValue("us-gaap:NetIncomeLoss", "Duration") || 0;

    // OtherComprehensiveIncome
    self.xbrl.fields['OtherComprehensiveIncome'] = self.xbrl.getFactValue("us-gaap:OtherComprehensiveIncomeLossNetOfTax", "Duration") ||
    self.xbrl.getFactValue("us-gaap:OtherComprehensiveIncomeLossNetOfTax", "Duration") || 0;

    // ComprehensiveIncome
    self.xbrl.fields['ComprehensiveIncome'] = self.xbrl.getFactValue("us-gaap:ComprehensiveIncomeNetOfTaxIncludingPortionAttributableToNoncontrollingInterest", "Duration") ||
    self.xbrl.getFactValue("us-gaap:ComprehensiveIncomeNetOfTax", "Duration") || 0;

    // ComprehensiveIncomeAttributableToParent
    self.xbrl.fields['ComprehensiveIncomeAttributableToParent'] = self.xbrl.getFactValue("us-gaap:ComprehensiveIncomeNetOfTax", "Duration") ||
    self.xbrl.getFactValue("us-gaap:ComprehensiveIncomeNetOfTax", "Duration") || 0;

    // ComprehensiveIncomeAttributableToNoncontrollingInterest
    self.xbrl.fields['ComprehensiveIncomeAttributableToNoncontrollingInterest'] = self.xbrl.getFactValue("us-gaap:ComprehensiveIncomeNetOfTaxAttributableToNoncontrollingInterest", "Duration") ||
    self.xbrl.getFactValue("us-gaap:ComprehensiveIncomeNetOfTaxAttributableToNoncontrollingInterest", "Duration") || 0;

    // 'Adjustments to income statement information
    // Impute: NonoperatingIncomeLossPlusInterestAndDebtExpense
    self.xbrl.fields['NonoperatingIncomeLossPlusInterestAndDebtExpense'] = self.xbrl.fields['NonoperatingIncomeLoss'] + self.xbrl.fields['InterestAndDebtExpense'];

    // Impute: Net income available to common stockholders  (if it does not exist)
    if (self.xbrl.fields['NetIncomeAvailableToCommonStockholdersBasic'] === 0
        && self.xbrl.fields['PreferredStockDividendsAndOtherAdjustments'] === 0 &&
        self.xbrl.fields['NetIncomeAttributableToParent'] !== 0) {
        self.xbrl.fields['NetIncomeAvailableToCommonStockholdersBasic'] = self.xbrl.fields['NetIncomeAttributableToParent'];
    }

    // Impute NetIncomeLoss
    if (self.xbrl.fields['NetIncomeLoss'] !== 0 &&
        self.xbrl.fields['IncomeFromContinuingOperationsAfterTax']=== 0) {
        self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] = self.xbrl.fields['NetIncomeLoss'] - self.xbrl.fields['IncomeFromDiscontinuedOperations'] - self.xbrl.fields['ExtraordaryItemsGainLoss'];
    }

    // Impute: Net income attributable to parent if it does not exist
    if (self.xbrl.fields['NetIncomeAttributableToParent'] === 0 &&
        self.xbrl.fields['NetIncomeAttributableToNoncontrollingInterest'] === 0 &&
        self.xbrl.fields['NetIncomeLoss'] !== 0) {
        self.xbrl.fields['NetIncomeAttributableToParent'] = self.xbrl.fields['NetIncomeLoss'];
    }

    // Impute: PreferredStockDividendsAndOtherAdjustments
    if (self.xbrl.fields['PreferredStockDividendsAndOtherAdjustments'] === 0 &&
        self.xbrl.fields['NetIncomeAttributableToParent'] !== 0 &&
        self.xbrl.fields['NetIncomeAvailableToCommonStockholdersBasic'] !== 0) {
        self.xbrl.fields['PreferredStockDividendsAndOtherAdjustments'] = self.xbrl.fields['NetIncomeAttributableToParent'] - self.xbrl.fields['NetIncomeAvailableToCommonStockholdersBasic'];
    }

    // Impute: comprehensive income
    if (self.xbrl.fields['ComprehensiveIncomeAttributableToParent'] === 0 &&
        self.xbrl.fields['ComprehensiveIncomeAttributableToNoncontrollingInterest'] === 0 &&
        self.xbrl.fields['ComprehensiveIncome'] === 0 && self.xbrl.fields['OtherComprehensiveIncome'] === 0) {
        self.xbrl.fields['ComprehensiveIncome'] = self.xbrl.fields['NetIncomeLoss'];
    }

    // Impute: other comprehensive income
    if (self.xbrl.fields['ComprehensiveIncome'] !== 0 &&
        self.xbrl.fields['OtherComprehensiveIncome'] === 0) {
        self.xbrl.fields['OtherComprehensiveIncome'] = self.xbrl.fields['ComprehensiveIncome'] - self.xbrl.fields['NetIncomeLoss'];
    }

    // Impute: comprehensive income attributable to parent if it does not exist
    if (self.xbrl.fields['ComprehensiveIncomeAttributableToParent'] === 0 &&
        self.xbrl.fields['ComprehensiveIncomeAttributableToNoncontrollingInterest'] === 0 &&
        self.xbrl.fields['ComprehensiveIncome'] !== 0) {
        self.xbrl.fields['ComprehensiveIncomeAttributableToParent'] = self.xbrl.fields['ComprehensiveIncome'];
    }

    // Impute: IncomeFromContinuingOperations*Before*Tax
    if (self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] !== 0 &&
        self.xbrl.fields['IncomeFromEquityMethodInvestments'] !== 0 &&
        self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] === 0) {
        self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] = self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] + self.xbrl.fields['IncomeFromEquityMethodInvestments'];
    }

    // Impute: IncomeFromContinuingOperations*Before*Tax2 (if income before tax is missing)
    if (self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] === 0 &&
        self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] !== 0) {
        self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] = self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] + self.xbrl.fields['IncomeTaxExpenseBenefit'];
    }

    // Impute: IncomeFromContinuingOperations*After*Tax
    if (self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] === 0 &&
        (self.xbrl.fields['IncomeTaxExpenseBenefit'] !== 0 || self.xbrl.fields['IncomeTaxExpenseBenefit'] === 0) &&
        self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] !== 0) {
        self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] = self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] - self.xbrl.fields['IncomeTaxExpenseBenefit'];
    }

    // Impute: GrossProfit
    if (self.xbrl.fields['GrossProfit'] === 0 &&
        (self.xbrl.fields['Revenues'] !== 0 &&
        self.xbrl.fields['CostOfRevenue'] !== 0)) {
        self.xbrl.fields['GrossProfit'] = self.xbrl.fields['Revenues'] - self.xbrl.fields['CostOfRevenue'];
    }

    // Impute: GrossProfit
    if (self.xbrl.fields['GrossProfit'] === 0 &&
        (self.xbrl.fields['Revenues'] !== 0 &&
        self.xbrl.fields['CostOfRevenue'] !== 0)) {
        self.xbrl.fields['GrossProfit'] = self.xbrl.fields['Revenues'] - self.xbrl.fields['CostOfRevenue'];
    }

    // Impute: Revenues
    if (self.xbrl.fields['GrossProfit'] !== 0 &&
        (self.xbrl.fields['Revenues'] === 0 &&
        self.xbrl.fields['CostOfRevenue'] !== 0)) {
        self.xbrl.fields['Revenues'] = self.xbrl.fields['GrossProfit'] + self.xbrl.fields['CostOfRevenue'];
    }

    // Impute: CostOfRevenue
    if (self.xbrl.fields['GrossProfit'] !== 0 &&
        (self.xbrl.fields['Revenues'] !== 0 &&
        self.xbrl.fields['CostOfRevenue'] === 0)) {
        self.xbrl.fields['CostOfRevenue'] = self.xbrl.fields['GrossProfit'] + self.xbrl.fields['Revenues'];
    }

    // Impute: CostsAndExpenses (would NEVER have costs and expenses if has gross profit, gross profit is multi-step and costs and expenses is single-step)
    if (self.xbrl.fields['GrossProfit'] === 0 &&
        self.xbrl.fields['CostsAndExpenses'] === 0 &&
    (self.xbrl.fields['CostOfRevenue'] !== 0 &&
        self.xbrl.fields['OperatingExpenses'] !== 0)) {
        self.xbrl.fields['CostsAndExpenses'] = self.xbrl.fields['CostOfRevenue'] + self.xbrl.fields['OperatingExpenses'];
    }

    // Impute: CostsAndExpenses based on existance of both costs of revenues and operating expenses
    if (self.xbrl.fields['CostsAndExpenses'] === 0 &&
        self.xbrl.fields['OperatingExpenses'] !== 0 &&
    (self.xbrl.fields['CostOfRevenue'] !== 0)) {
        self.xbrl.fields['CostsAndExpenses'] = self.xbrl.fields['CostOfRevenue'] + self.xbrl.fields['OperatingExpenses'];
    }

    // Impute: CostsAndExpenses
    if (self.xbrl.fields['GrossProfit'] === 0 &&
        self.xbrl.fields['CostsAndExpenses'] === 0 &&
    self.xbrl.fields['Revenues'] !== 0 &&
    self.xbrl.fields['OperatingIncomeLoss'] !== 0 &&
    self.xbrl.fields['OtherOperatingIncome'] !== 0) {
        self.xbrl.fields['CostsAndExpenses'] = self.xbrl.fields['Revenues'] - self.xbrl.fields['OperatingIncomeLoss'] - self.xbrl.fields['OtherOperatingIncome'];
    }

    // Impute: OperatingExpenses based on existance of costs and expenses and cost of revenues
    if (self.xbrl.fields['CostOfRevenue'] !== 0 &&
        self.xbrl.fields['CostsAndExpenses'] !== 0 &&
    self.xbrl.fields['OperatingExpenses'] === 0) {
        self.xbrl.fields['OperatingExpenses'] = self.xbrl.fields['CostsAndExpenses'] - self.xbrl.fields['CostOfRevenue'];
    }

    // Impute: CostOfRevenues single-step method
    if (self.xbrl.fields['Revenues'] !== 0 &&
        self.xbrl.fields['GrossProfit'] === 0 &&
    (self.xbrl.fields['Revenues'] - self.xbrl.fields['CostsAndExpenses']==self.xbrl.fields['OperatingIncomeLoss']) &&
    self.xbrl.fields['OperatingExpenses'] === 0 &&
    self.xbrl.fields['OtherOperatingIncome'] === 0) {
        self.xbrl.fields['CostOfRevenue'] = self.xbrl.fields['CostsAndExpenses'] - self.xbrl.fields['OperatingExpenses'];
    }

    // Impute: IncomeBeforeEquityMethodInvestments
    if (self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] === 0 &&
        self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] !== 0) {
        self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] = self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] - self.xbrl.fields['IncomeFromEquityMethodInvestments'];
    }

    // Impute: IncomeBeforeEquityMethodInvestments
    if (self.xbrl.fields['OperatingIncomeLoss'] !== 0 &&
        self.xbrl.fields['NonoperatingIncomeLoss'] !== 0 &&
        self.xbrl.fields['InterestAndDebtExpense'] == 0 &&
        self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] !== 0) {
        self.xbrl.fields['InterestAndDebtExpense'] = self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] - (self.xbrl.fields['OperatingIncomeLoss'] + self.xbrl.fields['NonoperatingIncomeLoss']);
    }

    // Impute: OtherOperatingIncome
    if (self.xbrl.fields['GrossProfit'] !== 0 &&
        self.xbrl.fields['OperatingExpenses'] !== 0 &&
        self.xbrl.fields['OperatingIncomeLoss'] !== 0) {
        self.xbrl.fields['OtherOperatingIncome'] = self.xbrl.fields['OperatingIncomeLoss'] - (self.xbrl.fields['GrossProfit'] - self.xbrl.fields['OperatingExpenses']);
    }

    // Move IncomeFromEquityMethodInvestments
    if (self.xbrl.fields['IncomeFromEquityMethodInvestments'] !== 0 &&
    self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] !== 0 &&
    self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] !== self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax']) {
        self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] = self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] - self.xbrl.fields['IncomeFromEquityMethodInvestments'];
        self.xbrl.fields['OperatingIncomeLoss'] = self.xbrl.fields['OperatingIncomeLoss'] - self.xbrl.fields['IncomeFromEquityMethodInvestments'];
    }

    // DANGEROUS!!  May need to turn off. IS3 had 2085 PASSES WITHOUT this imputing. if it is higher,: keep the test
    // Impute: OperatingIncomeLoss
    if (self.xbrl.fields['OperatingIncomeLoss'] === 0 && self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] !== 0) {
        self.xbrl.fields['OperatingIncomeLoss'] = self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] + self.xbrl.fields['NonoperatingIncomeLoss'] - self.xbrl.fields['InterestAndDebtExpense'];
    }

    self.xbrl.fields['NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments'] = self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] - self.xbrl.fields['OperatingIncomeLoss'];

    // NonoperatingIncomeLossPlusInterestAndDebtExpense
    if (self.xbrl.fields['NonoperatingIncomeLossPlusInterestAndDebtExpense'] === 0 && self.xbrl.fields['NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments']!== 0) {
        self.xbrl.fields['NonoperatingIncomeLossPlusInterestAndDebtExpense'] = self.xbrl.fields['NonoperatingIncomePlusInterestAndDebtExpensePlusIncomeFromEquityMethodInvestments'] - self.xbrl.fields['IncomeFromEquityMethodInvestments'];
    }

    var lngIS1 = (self.xbrl.fields['Revenues'] - self.xbrl.fields['CostOfRevenue']) - self.xbrl.fields['GrossProfit'];
    var lngIS2 = (self.xbrl.fields['GrossProfit'] - self.xbrl.fields['OperatingExpenses'] + self.xbrl.fields['OtherOperatingIncome']) - self.xbrl.fields['OperatingIncomeLoss'];
    var lngIS3 = (self.xbrl.fields['OperatingIncomeLoss'] + self.xbrl.fields['NonoperatingIncomeLossPlusInterestAndDebtExpense']) - self.xbrl.fields['IncomeBeforeEquityMethodInvestments'];
    var lngIS4 = (self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] + self.xbrl.fields['IncomeFromEquityMethodInvestments']) - self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'];
    var lngIS5 = (self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] - self.xbrl.fields['IncomeTaxExpenseBenefit']) - self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'];
    var lngIS6 = (self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] + self.xbrl.fields['IncomeFromDiscontinuedOperations'] + self.xbrl.fields['ExtraordaryItemsGainLoss']) - self.xbrl.fields['NetIncomeLoss'];
    var lngIS7 = (self.xbrl.fields['NetIncomeAttributableToParent'] + self.xbrl.fields['NetIncomeAttributableToNoncontrollingInterest']) - self.xbrl.fields['NetIncomeLoss'];
    var lngIS8 = (self.xbrl.fields['NetIncomeAttributableToParent'] - self.xbrl.fields['PreferredStockDividendsAndOtherAdjustments']) - self.xbrl.fields['NetIncomeAvailableToCommonStockholdersBasic'];
    var lngIS9 = (self.xbrl.fields['ComprehensiveIncomeAttributableToParent'] + self.xbrl.fields['ComprehensiveIncomeAttributableToNoncontrollingInterest']) - self.xbrl.fields['ComprehensiveIncome'];
    var lngIS10 = (self.xbrl.fields['NetIncomeLoss'] + self.xbrl.fields['OtherComprehensiveIncome']) - self.xbrl.fields['ComprehensiveIncome'];
    var lngIS11 = self.xbrl.fields['OperatingIncomeLoss'] - (self.xbrl.fields['Revenues'] - self.xbrl.fields['CostsAndExpenses'] + self.xbrl.fields['OtherOperatingIncome']);

    if (lngIS1) {
        console.log("IS1: GrossProfit(" + self.xbrl.fields['GrossProfit'] + ") = Revenues(" + self.xbrl.fields['Revenues'] + ") - CostOfRevenue(" + self.xbrl.fields['CostOfRevenue'] + "): " + lngIS1);
    }
    if (lngIS2) {
        console.log("IS2: OperatingIncomeLoss(" + self.xbrl.fields['OperatingIncomeLoss'] + ") = GrossProfit(" + self.xbrl.fields['GrossProfit'] + ") - OperatingExpenses(" + self.xbrl.fields['OperatingExpenses'] + ") + OtherOperatingIncome(" + self.xbrl.fields['OtherOperatingIncome'] + "): " + lngIS2);
    }
    if (lngIS3) {
        console.log("IS3: IncomeBeforeEquityMethodInvestments(" + self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] + ") = OperatingIncomeLoss(" + self.xbrl.fields['OperatingIncomeLoss'] + ") - NonoperatingIncomeLoss(" + self.xbrl.fields['NonoperatingIncomeLoss'] + ")+ InterestAndDebtExpense(" + self.xbrl.fields['InterestAndDebtExpense'] + "): " + lngIS3);
    }
    if (lngIS4) {
        console.log("IS4: IncomeFromContinuingOperationsBeforeTax(" + self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] + ") = IncomeBeforeEquityMethodInvestments(" + self.xbrl.fields['IncomeBeforeEquityMethodInvestments'] + ") + IncomeFromEquityMethodInvestments(" + self.xbrl.fields['IncomeFromEquityMethodInvestments'] + "): " + lngIS4);
    }
    if (lngIS5) {
        console.log("IS5: IncomeFromContinuingOperationsAfterTax(" + self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] + ") = IncomeFromContinuingOperationsBeforeTax(" + self.xbrl.fields['IncomeFromContinuingOperationsBeforeTax'] + ") - IncomeTaxExpenseBenefit(" + self.xbrl.fields['IncomeTaxExpenseBenefit'] + "): " + lngIS5);
    }
    if  (lngIS6) {
        console.log("IS6: NetIncomeLoss(" + self.xbrl.fields['NetIncomeLoss'] + ") = IncomeFromContinuingOperationsAfterTax(" + self.xbrl.fields['IncomeFromContinuingOperationsAfterTax'] + ") + IncomeFromDiscontinuedOperations(" + self.xbrl.fields['IncomeFromDiscontinuedOperations'] + ") + ExtraordaryItemsGainLoss(" + self.xbrl.fields['ExtraordaryItemsGainLoss'] + "): " + lngIS6);
    }
    if (lngIS7) {
        console.log("IS7: NetIncomeLoss(" + self.xbrl.fields['NetIncomeLoss'] + ") = NetIncomeAttributableToParent(" + self.xbrl.fields['NetIncomeAttributableToParent'] + ") + NetIncomeAttributableToNoncontrollingInterest(" + self.xbrl.fields['NetIncomeAttributableToNoncontrollingInterest'] + "): " + lngIS7);
    }
    if (lngIS8) {
        console.log("IS8: NetIncomeAvailableToCommonStockholdersBasic(" + self.xbrl.fields['NetIncomeAvailableToCommonStockholdersBasic'] + ") = NetIncomeAttributableToParent(" + self.xbrl.fields['NetIncomeAttributableToParent'] + ") - PreferredStockDividendsAndOtherAdjustments(" + self.xbrl.fields['PreferredStockDividendsAndOtherAdjustments'] + "): " + lngIS8);
    }
    if (lngIS9) {
        console.log("IS9: ComprehensiveIncome(" + self.xbrl.fields['ComprehensiveIncome'] + ") = ComprehensiveIncomeAttributableToParent(" + self.xbrl.fields['ComprehensiveIncomeAttributableToParent'] + ") + ComprehensiveIncomeAttributableToNoncontrollingInterest(" + self.xbrl.fields['ComprehensiveIncomeAttributableToNoncontrollingInterest'] + "): " + lngIS9);
    }
    if (lngIS10) {
        console.log("IS10: ComprehensiveIncome(" + self.xbrl.fields['ComprehensiveIncome'] + ") = NetIncomeLoss(" + self.xbrl.fields['NetIncomeLoss'] + ") + OtherComprehensiveIncome(" + self.xbrl.fields['OtherComprehensiveIncome'] + "): " + lngIS10);
    }
    if (lngIS11) {
        console.log("IS11: OperatingIncomeLoss(" + self.xbrl.fields['OperatingIncomeLoss'] + ") = Revenues(" + self.xbrl.fields['Revenues'] + ") - CostsAndExpenses(" + self.xbrl.fields['CostsAndExpenses'] + ") + OtherOperatingIncome(" + self.xbrl.fields['OtherOperatingIncome'] + "): " + lngIS11);
    }

    // Cash flow statement

    // NetCashFlow
    self.xbrl.fields['NetCashFlow'] = self.xbrl.getFactValue("us-gaap:CashAndCashEquivalentsPeriodIncreaseDecrease", "Duration") ||
    self.xbrl.getFactValue("us-gaap:CashPeriodIncreaseDecrease", "Duration") ||
    self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInContinuingOperations", "Duration") || 0;

    // NetCashFlowsOperating
    self.xbrl.fields['NetCashFlowsOperating'] = self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInOperatingActivities", "Duration") || 0;

    // NetCashFlowsInvesting
    self.xbrl.fields['NetCashFlowsInvesting'] = self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInInvestingActivities", "Duration") || 0;

    // NetCashFlowsFinancing
    self.xbrl.fields['NetCashFlowsFinancing'] = self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInFinancingActivities", "Duration") || 0;

    // NetCashFlowsOperatingContinuing
    self.xbrl.fields['NetCashFlowsOperatingContinuing'] = self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInOperatingActivitiesContinuingOperations", "Duration") || 0;

    // NetCashFlowsInvestingContinuing
    self.xbrl.fields['NetCashFlowsInvestingContinuing'] = self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInInvestingActivitiesContinuingOperations", "Duration") || 0;
    // NetCashFlowsFinancingContinuing
    self.xbrl.fields['NetCashFlowsFinancingContinuing'] = self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInFinancingActivitiesContinuingOperations", "Duration") || 0;

    // NetCashFlowsOperatingDiscontinued
    self.xbrl.fields['NetCashFlowsOperatingDiscontinued'] = self.xbrl.getFactValue("us-gaap:CashProvidedByUsedInOperatingActivitiesDiscontinuedOperations", "Duration") || 0;

    // NetCashFlowsInvestingDiscontinued
    self.xbrl.fields['NetCashFlowsInvestingDiscontinued'] = self.xbrl.getFactValue("us-gaap:CashProvidedByUsedInInvestingActivitiesDiscontinuedOperations", "Duration") || 0;

    // NetCashFlowsFinancingDiscontinued
    self.xbrl.fields['NetCashFlowsFinancingDiscontinued'] = self.xbrl.getFactValue("us-gaap:CashProvidedByUsedInFinancingActivitiesDiscontinuedOperations", "Duration") || 0;

    // NetCashFlowsDiscontinued
    self.xbrl.fields['NetCashFlowsDiscontinued'] = self.xbrl.getFactValue("us-gaap:NetCashProvidedByUsedInDiscontinuedOperations", "Duration") || 0;

    // ExchangeGainsLosses
    self.xbrl.fields['ExchangeGainsLosses'] = self.xbrl.getFactValue("us-gaap:EffectOfExchangeRateOnCashAndCashEquivalents", "Duration") ||
    self.xbrl.getFactValue("us-gaap:EffectOfExchangeRateOnCashAndCashEquivalentsContinuingOperations", "Duration") ||
    self.xbrl.getFactValue("us-gaap:CashProvidedByUsedInFinancingActivitiesDiscontinuedOperations", "Duration") || 0;

    // Adjustments
    // Impute: total net cash flows discontinued if not reported
    if (self.xbrl.fields['NetCashFlowsDiscontinued'] === 0) {
        self.xbrl.fields['NetCashFlowsDiscontinued'] = self.xbrl.fields['NetCashFlowsOperatingDiscontinued'] + self.xbrl.fields['NetCashFlowsInvestingDiscontinued'] + self.xbrl.fields['NetCashFlowsFinancingDiscontinued'];
    }

    // Impute: cash flows from continuing
    if (self.xbrl.fields['NetCashFlowsOperating'] !== 0 && self.xbrl.fields['NetCashFlowsOperatingContinuing'] === 0) {
        self.xbrl.fields['NetCashFlowsOperatingContinuing'] = self.xbrl.fields['NetCashFlowsOperating'] - self.xbrl.fields['NetCashFlowsOperatingDiscontinued'];
    }

    if (self.xbrl.fields['NetCashFlowsInvesting'] !== 0 && self.xbrl.fields['NetCashFlowsInvestingContinuing'] === 0) {
        self.xbrl.fields['NetCashFlowsInvestingContinuing'] = self.xbrl.fields['NetCashFlowsInvesting'] - self.xbrl.fields['NetCashFlowsInvestingDiscontinued'];
    }

    if (self.xbrl.fields['NetCashFlowsFinancing'] !== 0 && self.xbrl.fields['NetCashFlowsFinancingContinuing'] === 0) {
        self.xbrl.fields['NetCashFlowsFinancingContinuing'] = self.xbrl.fields['NetCashFlowsFinancing'] - self.xbrl.fields['NetCashFlowsFinancingDiscontinued'];
    }

    if (self.xbrl.fields['NetCashFlowsOperating'] === 0 && self.xbrl.fields['NetCashFlowsOperatingContinuing'] !== 0 && self.xbrl.fields['NetCashFlowsOperatingDiscontinued'] === 0) {
        self.xbrl.fields['NetCashFlowsOperating'] = self.xbrl.fields['NetCashFlowsOperatingContinuing'];
    }

    if (self.xbrl.fields['NetCashFlowsInvesting'] === 0 && self.xbrl.fields['NetCashFlowsInvestingContinuing'] !== 0 && self.xbrl.fields['NetCashFlowsInvestingDiscontinued'] === 0) {
        self.xbrl.fields['NetCashFlowsInvesting'] = self.xbrl.fields['NetCashFlowsInvestingContinuing'];
    }

    if (self.xbrl.fields['NetCashFlowsFinancing'] === 0 && self.xbrl.fields['NetCashFlowsFinancingContinuing'] !== 0 && self.xbrl.fields['NetCashFlowsFinancingDiscontinued'] === 0) {
        self.xbrl.fields['NetCashFlowsFinancing'] = self.xbrl.fields['NetCashFlowsFinancingContinuing'];
    }

    self.xbrl.fields['NetCashFlowsContinuing'] = self.xbrl.fields['NetCashFlowsOperatingContinuing'] + self.xbrl.fields['NetCashFlowsInvestingContinuing'] + self.xbrl.fields['NetCashFlowsFinancingContinuing'];

    // Impute: if net cash flow is missing,: this tries to figure out the value by adding up the detail
    if (self.xbrl.fields['NetCashFlow'] === 0 && (self.xbrl.fields['NetCashFlowsOperating'] !== 0 || self.xbrl.fields['NetCashFlowsInvesting'] !== 0 || self.xbrl.fields['NetCashFlowsFinancing'] !== 0)) {
        self.xbrl.fields['NetCashFlow'] = self.xbrl.fields['NetCashFlowsOperating'] + self.xbrl.fields['NetCashFlowsInvesting'] + self.xbrl.fields['NetCashFlowsFinancing'];
    }

    var lngCF1 = self.xbrl.fields['NetCashFlow'] - (self.xbrl.fields['NetCashFlowsOperating'] + self.xbrl.fields['NetCashFlowsInvesting'] + self.xbrl.fields['NetCashFlowsFinancing'] + self.xbrl.fields['ExchangeGainsLosses']);

    if (lngCF1 !== 0 && (self.xbrl.fields['NetCashFlow'] - (self.xbrl.fields['NetCashFlowsOperating'] + self.xbrl.fields['NetCashFlowsInvesting'] + self.xbrl.fields['NetCashFlowsFinancing'] + self.xbrl.fields['ExchangeGainsLosses']) === (self.xbrl.fields['ExchangeGainsLosses']* -1))) {
        lngCF1 = 888888;
    }

    // What is going on here is that 171 filers compute net cash flow differently than everyone else.
    // What I am doing is marking these by setting the value of the test to a number 888888 which would never occur naturally, so that I can differentiate this from errors.
    var lngCF2 = self.xbrl.fields['NetCashFlowsContinuing'] - (self.xbrl.fields['NetCashFlowsOperatingContinuing'] + self.xbrl.fields['NetCashFlowsInvestingContinuing'] + self.xbrl.fields['NetCashFlowsFinancingContinuing']);
    var lngCF3 = self.xbrl.fields['NetCashFlowsDiscontinued'] - (self.xbrl.fields['NetCashFlowsOperatingDiscontinued'] + self.xbrl.fields['NetCashFlowsInvestingDiscontinued'] + self.xbrl.fields['NetCashFlowsFinancingDiscontinued']);
    var lngCF4 = self.xbrl.fields['NetCashFlowsOperating'] - (self.xbrl.fields['NetCashFlowsOperatingContinuing'] + self.xbrl.fields['NetCashFlowsOperatingDiscontinued']);
    var lngCF5 = self.xbrl.fields['NetCashFlowsInvesting'] - (self.xbrl.fields['NetCashFlowsInvestingContinuing'] + self.xbrl.fields['NetCashFlowsInvestingDiscontinued']);
    var lngCF6 = self.xbrl.fields['NetCashFlowsFinancing'] - (self.xbrl.fields['NetCashFlowsFinancingContinuing'] + self.xbrl.fields['NetCashFlowsFinancingDiscontinued']);


    if (lngCF1) {
        console.log("CF1: NetCashFlow(" + self.xbrl.fields['NetCashFlow'] + ") = (NetCashFlowsOperating(" + self.xbrl.fields['NetCashFlowsOperating'] + ") + (NetCashFlowsInvesting(" + self.xbrl.fields['NetCashFlowsInvesting'] + ") + (NetCashFlowsFinancing(" + self.xbrl.fields['NetCashFlowsFinancing'] + ") + ExchangeGainsLosses(" + self.xbrl.fields['ExchangeGainsLosses'] + "): " + lngCF1);
    }

    if (lngCF2) {
        console.log("CF2: NetCashFlowsContinuing(" + self.xbrl.fields['NetCashFlowsContinuing'] + ") = NetCashFlowsOperatingContinuing(" + self.xbrl.fields['NetCashFlowsOperatingContinuing'] + ") + NetCashFlowsInvestingContinuing(" + self.xbrl.fields['NetCashFlowsInvestingContinuing'] + ") + NetCashFlowsFinancingContinuing(" + self.xbrl.fields['NetCashFlowsFinancingContinuing'] + "): " + lngCF2);
    }

    if (lngCF3) {
        console.log("CF3: NetCashFlowsDiscontinued(" + self.xbrl.fields['NetCashFlowsDiscontinued'] + ") = NetCashFlowsOperatingDiscontinued(" + self.xbrl.fields['NetCashFlowsOperatingDiscontinued'] + ") + NetCashFlowsInvestingDiscontinued(" + self.xbrl.fields['NetCashFlowsInvestingDiscontinued'] + ") + NetCashFlowsFinancingDiscontinued(" + self.xbrl.fields['NetCashFlowsFinancingDiscontinued'] + "): " + lngCF3);
    }

    if (lngCF4) {
        console.log("CF4: NetCashFlowsOperating(" + self.xbrl.fields['NetCashFlowsOperating'] + ") = NetCashFlowsOperatingContinuing(" + self.xbrl.fields['NetCashFlowsOperatingContinuing'] + ") + NetCashFlowsOperatingDiscontinued(" + self.xbrl.fields['NetCashFlowsOperatingDiscontinued'] + "): " + lngCF4);
    }

    if (lngCF5) {
        console.log("CF5: NetCashFlowsInvesting(" + self.xbrl.fields['NetCashFlowsInvesting'] + ") = NetCashFlowsInvestingContinuing(" + self.xbrl.fields['NetCashFlowsInvestingContinuing'] + ") + NetCashFlowsInvestingDiscontinued(" + self.xbrl.fields['NetCashFlowsInvestingDiscontinued'] + "): " + lngCF5);
    }

    if (lngCF6) {
        console.log("CF6: NetCashFlowsFinancing(" + self.xbrl.fields['NetCashFlowsFinancing'] + ") = NetCashFlowsFinancingContinuing(" + self.xbrl.fields['NetCashFlowsFinancingContinuing'] + ") + NetCashFlowsFinancingDiscontinued(" + self.xbrl.fields['NetCashFlowsFinancingDiscontinued'] + "): " + lngCF6);
    }

    // Key ratios
    self.xbrl.fields['SGR'] = ((self.xbrl.fields['NetIncomeLoss'] / self.xbrl.fields['Revenues'])
        * (1 + ((self.xbrl.fields['Assets'] - self.xbrl.fields['Equity']) / self.xbrl.fields['Equity']))) / ((1 / (self.xbrl.fields['Revenues'] / self.xbrl.fields['Assets']))
        - (((self.xbrl.fields['NetIncomeLoss'] / self.xbrl.fields['Revenues']) * (1 + (((self.xbrl.fields['Assets']
        - self.xbrl.fields['Equity']) / self.xbrl.fields['Equity'])))))) || null;

    self.xbrl.fields['ROA'] = self.xbrl.fields['NetIncomeLoss'] / self.xbrl.fields['Assets'];

    self.xbrl.fields['ROE'] = self.xbrl.fields['NetIncomeLoss'] / self.xbrl.fields['Equity'];

    self.xbrl.fields['ROS'] = self.xbrl.fields['NetIncomeLoss'] / self.xbrl.fields['Revenues'];
}

module.exports = {
    load: load
};
