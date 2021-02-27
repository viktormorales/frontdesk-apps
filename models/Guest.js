import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const guestSchema = new Schema({
  inhouse_at: {
    type: Date
  },
  suite: {
    type: Number,
    required: true
  },
  guest: {
    type: String,
    required: true
  },
  checkout: {
      type: Date,
  },
  pax: {
      type: Number,
      default: 1
  }
}, opts);

guestSchema.virtual('checkout_time').get(function() {
	return moment(this.checkout).format('HH:mm');
});
guestSchema.virtual('checkout_date').get(function() {
  return moment(this.checkout).format('D/MM/YYYY');
});

export default mongoose.model('Guest', guestSchema);