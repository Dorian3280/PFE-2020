import { Meteor } from 'meteor/meteor';
import Boulders from '.';

import { pointsAccounting } from '/imports/utils/methods';

Meteor.methods({
  'boulders.create': function createBoulders(number) {

    for (let i=0; i<number; i++) {
      Boulders.insert({
        id: i,
        men: [],
        women: []
      });
    }
  },
  'boulders.updateBoulder': function updateBoulder({idBoulder, idClimber, methods, kind, push}) {
    
    const response = Boulders.update({id: idBoulder}, { [push ? "$push" : "$pull"]: { [kind]: idClimber } });
    if (response === undefined) throw new Meteor.Error('500', 'HACK !!!')

    const arrayOfClimbers = Boulders.findOne({ id: idBoulder })[kind]; // Récupére les personnes qui ont fait le bloc 
    
    const results = pointsAccounting(methods, arrayOfClimbers.length, push);
    
    Meteor.call('climber.updatePoints', idClimber, results.pointsForMain);
    if (results.pointsForOthers === 0)  return false;
    arrayOfClimbers.filter(e => e !== idClimber).forEach((idClimber) => {

        // Les points des autres grimpeurs sont impactés
        Meteor.call('climber.updatePoints', idClimber, results.pointsForOthers);
    });
    

  },
});