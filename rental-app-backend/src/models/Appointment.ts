import mongoose, { Document, Schema } from 'mongoose';

interface IAppointment extends Document {
  tenantId: mongoose.Types.ObjectId;
  landlordId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  dateTime: Date;
  status: 'pending' | 'confirmed' | 'canceled';
  notes?: string;
  calendarEventId?: string;
}

const AppointmentSchema: Schema<IAppointment> = new mongoose.Schema(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    landlordId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
    notes: { type: String },
    calendarEventId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);

