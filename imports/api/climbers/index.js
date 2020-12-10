import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Climbers = new Mongo.Collection('climbers');

ClimbersSchema = new SimpleSchema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        kind: {
            type: Number,
            allowedValues: [1, 2],
        },
        boulders: [Number],
        points: {
            type: Number,
        },
        codeContest: {
            type: String,
            regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/,
        },
        createdAt: {
            type: Date,
        },
    },{
    clean: {
        removeEmptyStrings: false, 
    },
});

Climbers.attachSchema(ClimbersSchema);

export default Climbers;
