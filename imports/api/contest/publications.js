import { Meteor } from 'meteor/meteor';

import Contest from '.';

Meteor.publish('contest.find', function() {
    return Contest.find();
});
  