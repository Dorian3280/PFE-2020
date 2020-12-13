import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Contest = new Mongo.Collection('contest');

ContestSchema = new SimpleSchema(
    {
      hostName: {
        type: String,
      },
      nbrBoulder: {
        type: Number,
        min: 5,
        max: 150,
      },
      code: {
        type: String,
        regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      },
      methods: {
        type: Number,
        allowedValues: [1, 2],
      },
      startAt: {
        type: Date,
      },
      createdAt: {
        type: Date,
      }
    },{
      clean: {
          trimStrings: true,
      },
});

Contest.attachSchema(ContestSchema);

export default Contest;
