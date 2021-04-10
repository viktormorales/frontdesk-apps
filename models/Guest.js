import mongoose from 'mongoose';
import moment from 'moment';

const opts = { toJSON: { virtuals: true } };
let guest = new mongoose.Schema({
  bookingCode: {
    type: String,
    unique: true
  },
  checkin: {
	  type: Date
  },
  checkout: {
    type: Date,
  },
  suite: {
    type: Number,
    required: true
  },
  guestName: {
    type: String
  },
  pax: {
      type: Number,
      default: 1
  },
  bebes: {
    type: Number,
    default: 0
  }
}, opts);

mongoose.models = {}

guest.virtual('checkinDate').get(function() {
  return moment(this.checkin).format('YYYY-MM-DD');
  //return this.email.slice(this.email.indexOf('@') + 1);
});

guest.virtual('checkoutDate').get(function() {
  return moment(this.checkout).format('YYYY-MM-DD');
  //return this.email.slice(this.email.indexOf('@') + 1);
});

let Guest = mongoose.model('Guest', guest);

export default Guest