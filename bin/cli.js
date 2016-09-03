#!/usr/bin/env node
var ParseXbrl = require("../index");
var params = process.argv;
var colors = require("colors");
var path = require("path");
var fs = require("fs");

var inputFile = params[2];
var outputFile = params[3];

var title = ""+
"                                 _          _ \n"+
"                                | |        | |\n"+
"  _ __   __ _ _ __ ___  _____  _| |__  _ __| |\n"+
" | '_ \\ / _` | '__/ __|/ _ \\ \\/ / '_ \\| '__| |\n"+
" | |_) | (_| | |  \\__ \\  __/>  <| |_) | |  | |\n"+
" | .__/ \\__,_|_|  |___/\\___/_/\\_\\_.__/|_|  |_|\n"+
" | |                                          \n"+
" |_|                                          \n";




console.log(title);
if (inputFile === "--help" || inputFile === "-h"){
    console.log("To run:\n");
    console.log("\tparsexbrl "+"[inputfile]".white+ " " +"[outputfile]".white+"\n");
    console.log("where");
    console.log("\tinputfile: a xbrl that needs to be converted");
    console.log("\toutputfile (optional): a json file that's outputted\n");
    console.log("Example:");
    console.log("\tparsexbrl thiscompany.xbrl thiscompany.json\n");
}
else if (inputFile != null){
    var inputFilePath = path.join(process.cwd(), inputFile);
    ParseXbrl.parse(inputFilePath, false).then(function(parsedDoc) {
        var parsedDocText = JSON.stringify(parsedDoc, null, "\t");
        if (outputFile){
            outputFilePath = path.join(process.cwd(), outputFile);
            fs.writeFile(outputFilePath, parsedDocText, function(err){
                if (err){
                    console.log(err.toString().red);
                }
                else {
                    console.log("\n   Complete writing to ".green + outputFile.green + "\n");
                }
            });
        
        }
        else {
            console.log(parsedDocText);
        }
    });
}
else {
    console.log("Please provide an input file".red); 
}
