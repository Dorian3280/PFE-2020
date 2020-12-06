import { Meteor } from 'meteor/meteor';
import Climbers from '.';

Meteor.methods({

  'climber.create': function createClimber({kind, code, firstName = "", lastName = "", unique = true}) {
    if (!unique) lastName += ' 2';

    return Climbers.insert({
      firstName,
      lastName,
      kind,
      boulders: [],
      points: 0,
      codeContest: code,
      createdAt: new Date()
    });
  },

  'climber.findByIdentity': function findByIdentity({firstName, lastName, kind}) {
    return Climbers.findOne({firstName, lastName, kind})
  },

  'climber.findById': function findById(id) {
    const response = Climbers.findOne({"_id" : id});
    
    if (response === undefined) throw new Meteor.Error('500', 'Cet Id n\'existe pas')
    return response
  },

  'climber.testId': function testId(id) {
    const user = Climbers.findOne({"_id" : id}, {fields: { id }})
    return user ? user['_id'] : undefined;
  },

  'climber.updateBouldersOfClimber': function updateBouldersOfClimber(idClimber, idBoulder, push) {
    
    const response = Climbers.update(idClimber, { [push ? "$push" : "$pull"]: { boulders: idBoulder } });
    if (response === undefined) throw new Meteor.Error('500', 'HACK !!!')

    return response;
  },

  'climber.updateName': function updateName(id, type, value) {
    
    const response = Climbers.update(id, { $set:  { [ type ]: value }});
    if (response === undefined) throw new Meteor.Error('500', 'HACK !!!')

    return response;
  },

  'climber.updatePoints': function updatePoints(id, value) {
    
    const response = Climbers.update(id, { $inc:  { "points": +value }});
    if (response === undefined) throw new Meteor.Error('500', 'HACK !!!')

    return response;
  },

});