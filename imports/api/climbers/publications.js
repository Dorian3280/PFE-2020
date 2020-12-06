import { Meteor } from 'meteor/meteor';

import Climbers from '.';

Meteor.publish('climbers.findAll', function(code) {
    return Climbers.find({ codeContest: code }, { limit: 1000, sort: { '_id': 1 } });
});

Meteor.publish('climbers.findOne', function(id) {
    return Climbers.find({"_id": id}, { limit: 1000, sort: { '_id': 1 } });
});
  