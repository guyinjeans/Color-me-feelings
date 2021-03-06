const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;
  //?? assert.equal(query.exec().constructor, require('bluebird'));
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const dbURI = 'mongodb://localhost:27017/NewsDB';
mongoose.connect(dbURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error!'));
db.once('open', () => { console.log('mongoose connected successfully'); });
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const articleSchema = new Schema({
  uuid: { type: String, required: true},
  date: { type: Date, default: Date.now },
  countryCode: { type: String, uppercase: true, minLength: 3, maxLength: 3 },
  stateCode: { type: String, uppercase: true, minlength: 2, maxlength: 2 },
  title: String,
  text: String,
  url: String
});

const stateTones = new Schema({
  state: String,
  tones: {
    anger: {type: Number, default: null},
    disgust: {type: Number, default: null},
    fear: {type: Number, default: null},
    sadness: {type: Number, default: null},
    joy: {type: Number, default: null}
  }
});

const StateTone = mongoose.model('StateTone', stateTones);
const Article = mongoose.model('Article', articleSchema);

module.exports = {
  StateTone: StateTone,
  Article: Article
};