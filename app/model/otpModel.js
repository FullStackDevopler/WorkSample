"use strict";
import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, unique: false, },
  otp: { type: String, required: true, trim: true, unique: true },
  isVerify: { type: Boolean, required: true, trim: true },
});
otpSchema.index({ user_id: 1  });
const otpModel = mongoose.model('otp', otpSchema);
export default otpModel;
