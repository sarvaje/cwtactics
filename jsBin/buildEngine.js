var builder = require("./buildLibrary.js");

var files = [];
var addEl = function( el ){ files.push( el ); };

files.push( "srcEngine/conf/gameConf.js" );
builder.getFileList("srcEngine").forEach( addEl );
builder.getFileList("srcEngine/util").forEach( addEl );
builder.getFileList("srcEngine/model").forEach( addEl );
builder.getFileList("srcEngine/controller").forEach( addEl );
builder.getFileList("srcEngine/script").forEach( addEl );
builder.getFileList("srcEngine/stateMachine").forEach( addEl );
builder.getFileList("srcEngine/commands").forEach( addEl );

// TURN DEBUG ON TO HAVE LOG AND RUNTIME CHECKS
builder.writeToFile(
  builder.readAndConcatFiles( files ),
  "jsBin/nightly/normal/engine.js"
);

// WITH DEBUG ON ==> LEAVES THE STATEMENTS BUT CUTS THE DEBUG === TRUE CHECKS
var ugly_code = builder.uglifyCode( "jsBin/nightly/normal/engine.js" );
builder.writeToFile( ugly_code, "jsBin/nightly/min/engine.js" );

// DEPS
files.splice(0);
builder.getFileList("libJs/engine").forEach( addEl );
builder.writeToFile(
  builder.readAndConcatFiles( files ),
  "jsBin/nightly/normal/engineDeps.js"
);

var ugly_code = builder.uglifyCode( "jsBin/nightly/normal/engineDeps.js" );
builder.writeToFile( ugly_code,"jsBin/nightly/min/engineDeps.js");