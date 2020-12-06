import { Meteor } from 'meteor/meteor';
import React from 'react';
import { hydrate } from 'react-dom';
import App from '/imports/ui/App';

const tabTranslation = {
  "User not found" : 'Les identifiants ne correspondent pas',
  "Email already exists." : 'Le nom d\'utilisateur existe déjà',
}

Meteor.callWithPromise = (method, data) => new Promise((res, rej) => {
  Meteor.call(method, data, (err, result) => err ? rej(err) : res(result));
});

Meteor.translateToFrench = (string) => tabTranslation[string];

Meteor.startup(() => {
  hydrate(<App />, document.getElementById('app'));
});