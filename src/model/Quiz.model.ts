import mongoose, { Schema, Document } from "mongoose";

export interface Content extends Document {
  question: string;
  options: Array<string>;
  answer: number;
}

const contentSchema: Schema<Content> = new Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
    trim: true,
  },
  options: {
    type: [String],
    required: [true, "Options are required"],
    validate: {
      validator: (arr: string[]) => arr.length >= 4,
      message: "At least 4 options are required",
    },
  },
  answer: {
    type: Number,
    required: [true, "Answer is required"],
    min: [0, "Answer index cannot be negative"],
  },
});

export interface Quiz extends Document {
  name: string;
  subject: string;
  slug: string;
  redirectLink: string;
  originalLink: string;
  content: Array<Content>;
  createdAt?: Date;
  updatedAt?: Date;
}

const quizSchema: Schema<Quiz> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      index: true,
    },
    redirectLink: {
      type: String,
    },
    originalLink: {
      type: String,
    },
    content: {
      type: [contentSchema],
    },
  },
  { timestamps: true }
);

const QuizModel =
  (mongoose.models.Quiz as mongoose.Model<Quiz>) ||
  mongoose.model("Quiz", quizSchema);

export default QuizModel;
