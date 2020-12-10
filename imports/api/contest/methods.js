import { Meteor } from 'meteor/meteor';
import Contest from '.';
import Boulders from '../boulders/index';

Meteor.methods({

  'contest.create': function createContest({hostName, nbrBoulder, code, methods, startAt, createdAt}) {
    
    for (let i=0; i<nbrBoulder; i++) {
      Boulders.insert({
        id: i,
        men: [],
        women: []
      })
    } 

    return Contest.insert({
      hostName,
      nbrBoulder,
      code,
      methods,
      startAt,
      createdAt,
    });
  },

  'contest.findByCode': function findByCode(code) {

    const response = Contest.findOne({ code });
    if (response === undefined) throw new Meteor.Error('500', 'Ce contest n\'existe pas')
    
    return response;
  },
  
});