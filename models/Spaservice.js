import mongoose from 'mongoose';

const opts = { toJSON: { virtuals: true } };
const SpaserviceSchema = new mongoose.Schema({
  service: {
    type: String,
  },
  duration: {
	type: String
  },

}, opts);

module.exports = mongoose.models.Spaservice || mongoose.model('Spaservice', SpaserviceSchema);