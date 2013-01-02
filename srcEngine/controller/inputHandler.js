/**
 * User input action state machine that controls the data flow between
 * user interactions and flushes actions.
 */
controller.input = util.createStateMachine( "NONE", {

  "NONE":{
    "start": function(){

      this.menu = util.list( 20, null );
      this.menuSize = 0;
      this.inMultiStep = false;

      this.actionData = controller.aquireActionDataObject();
      this.selectionData = new controller.SelectionData( CWT_MAX_MOVE_RANGE );

      return "IDLE";
    }
  },

  // -------------------------------------------------------------------------
  "IDLE":{

    "onenter": function(){
      this.menuSize = 0;
      this.inMultiStep = false;
      this.actionData.cleanIt();
    },

    "action": function( ev, x, y ){
      if( DEBUG ) this._checkClickEventArgs(ev,x,y);

      var dto = this.actionData;
      var refObj;
      dto.setSource( x,y );

      if( (refObj = model.unitPosMap[x][y]) !== null ){
        dto.setSourceUnit( refObj );
      }
      if( (refObj = model.propertyPosMap[x][y]) !== null ){
        dto.setSourceProperty(refObj);
      }

      if( dto.getSourceUnitId() !== CWT_INACTIVE_ID &&
          dto.getSourceUnit().owner === model.turnOwner &&
          model.canAct( dto.getSourceUnitId() )
      ){

        dto.setTarget(x,y);
        dto.setMovePath([]);
        model.fillMoveMap( this.selectionData, dto );
        return "MOVEPATH_SELECTION";
      }
      else{

        this._prepareMenu();
        return "ACTION_MENU";
      }
    },

    cancel:function(){
      return "IDLE";
    }
  },

  // -------------------------------------------------------------------------
  "MOVEPATH_SELECTION":{

    action: function( ev,x,y ){
      if( DEBUG ) controller.input._checkClickEventArgs(ev,x,y);

      if( this.selectionData.getPositionValue(x,y) < 0){
        if( CLIENT_DEBUG ){
          util.logInfo("break event because selection is not in the map");
        }

        return "MOVEPATH_SELECTION";
      }

      var dto = this.actionData;
      var ox = dto.getTargetX(  );
      var oy = dto.getTargetY(  );

      var dis = model.distance( ox,oy, x,y );
      dto.setTarget( x,y );

      if( dis === 0 ){

        util.fill( this.menu, null );
        this.menuSize = 0;

        var refObj;
        if( (refObj = model.unitPosMap[x][y]) !== null ){
          this.actionData.setTargetUnit(refObj );
        }
        if( (refObj = model.propertyPosMap[x][y]) !== null ){
          this.actionData.setTargetProperty(refObj );
        }

        this._prepareMenu();
        return "ACTION_MENU";
      }
      else if( dis === 1 ){
        var code = model.moveCodeFromAtoB( ox,oy, x,y );
        model.addCodeToPath( this.selectionData, dto, x,y, code );
        return "MOVEPATH_SELECTION";
      }
      else{
        // GENERATE PATH
        model.setPathByRecalculation( this.selectionData, dto, x,y );
        return "MOVEPATH_SELECTION";
      }
    },

    cancel: function(){
      return "IDLE";
    }
  },

  // -------------------------------------------------------------------------
  "ACTION_MENU":{

    action:function( ev, index ){
      if( DEBUG ) controller.input._checkMenuEventArgs( ev, index );

      var action = this.menu[ index ];
      var actObj = controller.getActionObject( action );
      this.actionData.setAction( action );

      if( actObj.prepareMenu !== null ){
        util.fill( this.menu, null );
        this.menuSize = 0;

        actObj.prepareMenu( this.actionData, controller.input._addMenuEntry );
        return "ACTION_SUBMENU";
      }
      else if( actObj.prepareTargets !== null ){
        return controller.input._prepareSelection( actObj, "ACTION_MENU" );
      }
      else return "FLUSH_ACTION";
    },

    cancel:function(){
      // if( this.inMultiStep ) return "ACTION_MENU";

      return ( this.actionData.getSourceUnit() !== null )?
        "MOVEPATH_SELECTION" : "IDLE";
    }
  },

  // -------------------------------------------------------------------------
  "ACTION_SUBMENU":{

    action: function( ev, index ){
      if( DEBUG ) controller.input._checkMenuEventArgs( ev, index );
      var action = this.menu[ index ];

      if( action === "done" ){
        return "IDLE";
      }

      var actObj = controller.getActionObject( this.actionData.getAction() );
      this.actionData.setSubAction( action );

      if( actObj.prepareTargets !== null ){
        return controller.input._prepareSelection( actObj, "ACTION_SUBMENU" );
      }
      else return "FLUSH_ACTION";
    },

    cancel: function(){
      if( this.inMultiStep ) return "ACTION_SUBMENU";

      util.fill( this.menu, null );
      this.menuSize = 0;

      this._prepareMenu();
      return "ACTION_MENU";
    }
  },

  // -------------------------------------------------------------------------
  "ACTION_SELECT_TARGET":{
    action: function( ev,x,y ){
      if( DEBUG ) controller.input._checkClickEventArgs(ev,x,y);

      if( this.selectionData.getPositionValue(x,y) < 0){
        if( CLIENT_DEBUG ){
          util.logInfo("break event because selection is not in the map");
        }

        return "ACTION_SELECT_TARGET";
      }

      this.actionData.setActionTarget(x,y);

      var refObj;
      if( (refObj = model.unitPosMap[x][y]) !== null ){
              this.actionData.setTargetUnit(refObj);
      } else  this.actionData.setTargetUnit(null);

      if( (refObj = model.propertyPosMap[x][y]) !== null ){
              this.actionData.setTargetProperty(refObj);
      } else  this.actionData.setTargetProperty(null);

      return "FLUSH_ACTION";
    },

    cancel: function(){
      return this._last;
    }
  },

  // -------------------------------------------------------------------------
  "FLUSH_ACTION": {
    actionState: function(){
      var action = this.actionData.getAction();
      var actObj = controller.getActionObject( action );

      // PUSH A COPY INTO THE COMMAND BUFFER
      controller.pushActionDataIntoBuffer( this.actionData.getCopy() );

      if( actObj.multiStepAction ){
        this.inMultiStep = true;
        var newData = controller.aquireActionDataObject();
        newData.setAction("invokeMultiStepAction");
        controller.pushActionDataIntoBuffer(newData);
        return "MULTISTEP_IDLE";
      }
      else return "IDLE";
    }
  },

  // -------------------------------------------------------------------------
  "MULTISTEP_IDLE": {

    "nextStep": function(){
      var action = this.actionData.getAction();
      var actObj = controller.getActionObject( action );

      this.menuSize = 0;
      this.actionData.setMovePath(null);
      util.fill( this.menu, null );

      actObj.prepareMenu( this.actionData, controller.input._addMenuEntry );
      controller.input._addMenuEntry("done");

      return (this.menuSize > 1)? "ACTION_SUBMENU": "IDLE";
    }
  }
});

/**
 * @private
 * @param entry
 */
controller.input._addMenuEntry = function( entry ){
  if( controller.input.menuSize === controller.input.menu.length ){
    util.unexpectedSituationError();
  }

  controller.input.menu[ controller.input.menuSize ] = entry;
  controller.input.menuSize++;
};

/**
 * @private
 * @param actObj
 * @param lastState
 */
controller.input._prepareSelection = function( actObj, lastState ){
  var x = this.actionData.getTargetX();
  var y = this.actionData.getTargetY();
  this._last = lastState;


  this.selectionData.cleanIt( -1, x,y );
  actObj.prepareTargets( this.actionData, this.selectionData );

  return "ACTION_SELECT_TARGET";
};

/**
 * @private
 * @param ev
 * @param index
 */
controller.input._checkMenuEventArgs = function( ev, index ){
  if( !util.isNumber(index) ) util.illegalArgumentError();
  if( index < 0 || index >= this.menu.length ) util.illegalArgumentError();
};

/**
 * @private
 * @param ev
 * @param x
 * @param y
 */
controller.input._checkClickEventArgs = function( ev, x,y ){
  if( !util.isNumber(x) || !util.isNumber(y) ) util.illegalArgumentError();
  if( !model.isValidPosition(x,y) ) util.illegalPositionError();
};

/**
 * @private
 */
controller.input._prepareMenu = function(){
  var dto = this.actionData;
  var addEl = controller.input._addMenuEntry;
  var commandKeys = Object.keys( controller.commands );

  for( var i=0,e=commandKeys.length; i<e; i++ ){
    if( controller.getActionObject( commandKeys[i] ).condition(dto) ){
      addEl( commandKeys[i] );
    }
  }
};