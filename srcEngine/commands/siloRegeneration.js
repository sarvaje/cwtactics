controller.engineAction({

  name:"siloRegeneration",
  
  key:"SIRE",
  
  /**
   * Invokes a day tick for an empty silo.
   *
   * @param {Number} pid property id
   *
   * @methodOf controller.actions
   * @name siloRegeneration
   */
  action: function( pid, turns ){
    
    var maxDays = model.rules.siloRegeneration;
    if( maxDays === -1 ) return;
    
    if( model.regeneratingSilos.hasOwnProperty(pid) ){
      model.regeneratingSilos[pid] += turns;
    }
    else model.regeneratingSilos[pid] = turns;
    
    if( model.regeneratingSilos[pid] >= maxDays ){
      delete model.regeneratingSilos[pid];
      model.properties[pid].type = "SILO";
    }
  }
});