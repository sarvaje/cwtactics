var _tmp_ = {
  "sheets" : [

    {
      "ID"                : "PLAIN",
      "tags"              : []
    },

    {
      "ID"                : "FOREST",
      "tags"              : [ "VISION_BLOCK" ]
    },

    {
      "ID"                : "MOUNTAIN",
      "tags"              : [ "" ]
    },

    {
      "ID"                : "CITY",
      "vision"            : 0,
      "capturePoints"     : 20,
      "funds"            : 1000,
      "repairs"           : {
        "*"             : 20
      },
      "tags"              : [ "PROPERTY" ]
    },

    {
      "ID"                : "GROUND_FACTORY",
      "vision"            : 0,
      "capturePoints"     : 20,
      "funds"            : 1000,
      "repairs"           : {
        "*"             : 20
      },
      "tags"              : [ "PROPERTY", "FACTORY" ]
    },

    {
      "ID"                : "AIRPORT",
      "vision"            : 0,
      "capturePoints"     : 20,
      "funds"            : 1000,
      "repairs"           : {
        "*"             : 20
      },
      "tags"              : [ "PROPERTY", "FACTORY" ]
    },

    {
      "ID"                : "PORT",
      "vision"            : 0,
      "capturePoints"     : 20,
      "funds"            : 1000,
      "repairs"           : {
        "*"             : 20
      },
      "tags"              : [ "PROPERTY", "FACTORY" ]
    },

    {
      "ID"                : "SILO",
      "vision"            : 0,
      "capturePoints"     : 20,
      "tags"              : [ "PROPERTY" ]
    },

    {
      "ID"                : "HQ",
      "vision"            : 1,
      "capturePoints"     : 20,
      "funds"            : 1000,
      "repairs"           : {
        "*"             : 20
      },
      "tags"              : [ "PROPERTY", "HQ" ]
    },

    {
      "ID"                : "RADAR",
      "vision"            : 4,
      "capturePoints"     : 20,
      "tags"              : [ "PROPERTY", "SCOUT" ]
    },

    {
      "ID"                : "STREET",
      "tags"              : []
    },

    {
      "ID"                : "RIVER",
      "tags"              : []
    },

    {
      "ID"                : "WATER",
      "tags"              : []
    },

    {
      "ID"                : "REEF",
      "tags"              : [ "VISION_BLOCK" ]
    },

    {
      "ID"                : "SHOAL",
      "tags"              : [ "VISION_BLOCK" ]
    }
  ]
};

for( var i = 0; i<_tmp_.sheets.length; i++ ){
  app.module("db").parse( _tmp_.sheets[i], app.module("db").types.TILE );
}