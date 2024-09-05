"use strict";
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true, unique: false, trim: true },
  phone: { type: Number, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  dob: { type: String, trim: true },
  gender: { type: String, trim: true },
  photo: { type: String, trim: true },
  password: { type: String, required: true, trim: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true, unique: false, },
  isActive: { type: Boolean, required: true, trim: true },
  isBlocked: { type: Boolean, required: true, trim: true },
  isVerify: { type: Boolean, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});
userSchema.index({ phone: 1, email: 1, role_id: 1, isActive: 1 });
const userModel = mongoose.model('users', userSchema);
export default userModel;
