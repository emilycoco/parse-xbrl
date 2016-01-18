function load(xbrlDoc) {
    var self = this;
    self.xbrl = xbrlDoc;

    console.log('FUNDAMENTAL ACCOUNTING CONCEPTS CHECK REPORT:');
    // console.log('XBRL Cloud Viewer: https://edgardashboard.xbrlcloud.com/flex/viewer/XBRLViewer.html#instance=' + self.xbrl.XBRLInstanceLocation);

    console.log('Entity regiant name: ' + self.xbrl.fields['EntityRegistrantName']);
    console.log('CIK: ' + self.xbrl.fields['EntityCentralIndexKey']);
    console.log('Entity filer category: ' + self.xbrl.fields['EntityFilerCategory']);
    console.log('Trading symbol: ' + self.xbrl.fields['TradingSymbol']);
    console.log('Fiscal year: ' + self.xbrl.fields['DocumentFiscalYearFocus']);
    console.log('Fiscal period: ' + self.xbrl.fields['DocumentFiscalPeriodFocus']);
    console.log('Document type: ' + self.xbrl.fields['DocumentType']);

    console.log('Balance Sheet Date (document period end date): ' + self.xbrl.fields['DocumentPeriodEndDate']);

    console.log('Context ID for document period focus (instants): ' + self.xbrl.fields['DocumentFiscalPeriodFocusContext']);
    console.log('Context ID for YTD period (durations): ' + self.xbrl.fields['DocumentFiscalYearFocusContext']);
}

module.exports = {
    load: load
};
