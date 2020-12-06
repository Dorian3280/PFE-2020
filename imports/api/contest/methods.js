import { Meteor } from 'meteor/meteor';
import Contest from '.';

Meteor.methods({

  'contest.create': function createContest(data) {
    return Contest.insert({
      ...data,
      createdAt: new Date(),
    });
  },

  'contest.findByCode': function findByCode(code) {

    const response = Contest.findOne({ code });
    if (response === undefined) throw new Meteor.Error('500', 'Ce contest n\'existe pas')
    
    return response;
  },
  
});