import { Meteor } from 'meteor/meteor';

import Boulders from '.';

Meteor.publish('boulders.findAll', function() {
    return Boulders.find({}, { limit: 1000, sort: { 'id': 1 } });
  });
  