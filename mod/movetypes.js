// TODO THIS DATA IS THE DEFAULT MOD DATA
// 

var _tmp_ = {

  "sheets" : [

    {
      "ID"            : "MV_INFANTRY",
      "costs"         : {
        "MOUNTAIN"      : 2,
        "WATER"         : 0,
        "REEF"          : 0,
        "*"             : 1
      }
    },

    {
      "ID"            : "MV_BAZOOKA",
      "costs"         :{
        "WATER"         : 0,
        "REEF"          : 0,
        "*"             : 1
      }
    },

    {
      "ID"            : "MV_TIRE_A",
      "costs"         :{
        "PLAIN"         : 2,
        "FOREST"        : 3,
        "MOUNTAIN"      : 0,
        "RIVER"         : 0,
        "WATER"         : 0,
        "REEF"          : 0,
        "*"             : 1
      }
    },

    {
      "ID"            : "MV_TIRE_B",
      "costs"         :{
        "FOREST"        : 3,
        "MOUNTAIN"      : 0,
        "RIVER"         : 0,
        "WATER"         : 0,
        "REEF"          : 0,
        "*"             : 1
      }
    },

    {
      "ID"            : "MV_TANK",
      "costs"         :{
        "FOREST"        : 2,
        "MOUNTAIN"      : 0,
        "RIVER"         : 0,
        "WATER"         : 0,
        "REEF"          : 0,
        "*"             : 1
      }
    },

    {
      "ID"            : "MV_AIR",
      "costs"         :{
        "*"             : 1
      }
    },

    {
      "ID"            : "MV_SHIP",
      "costs"         :{
        "WATER"         : 1,
        "RIVER"         : 1,
        "PORT"          : 1,
        "REEF"          : 2,
        "*"             : 0
      }
    },

    {
      "ID"            : "MV_WATER_TRANSPORT",
      "costs"         :{
        "WATER"         : 1,
        "RIVER"         : 1,
        "PORT"          : 1,
        "REEF"          : 2,
        "SHOAL"         : 1,
        "*"             : 0
      }
    }
  ]
};

for( var i = 0; i<_tmp_.sheets.length; i++ ){
  app.module("db").parse( _tmp_.sheets[i], app.module("db").types.MOVE_TYPE );
}