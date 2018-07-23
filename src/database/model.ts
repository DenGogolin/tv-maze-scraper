import Mongoose from "mongoose";

export interface IShow extends Mongoose.Document {
  id: number;
  name: string;
  cast: ICast[];
}

export interface ICast extends Mongoose.Document {
  id: number;
  name: string;
  birthday: string;
}

const baseSheme = {
  id: { type: Number, required: true, index: true, unieque: true },
  name: { type: String, required: true }
};

export const castSchema = new Mongoose.Schema({
  ...baseSheme,
  birthday: String
});

export const showSchema = new Mongoose.Schema({
  ...baseSheme,
  cast: { type: [castSchema], default: undefined }
});

export const showModel = Mongoose.model<IShow>("Show", showSchema);
