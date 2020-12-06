import { Meteor } from 'meteor/meteor';

import '/imports/api/climbers/methods';
import '/imports/api/climbers/publications';

import '/imports/api/contest/methods';
import '/imports/api/contest/publications';

import '/imports/api/boulders/methods';
import '/imports/api/boulders/publications';

Meteor.startup(() => {
  // code to run on server at startup
});
