'use strict';

const options = {
  timestamps: true,
  toObject: {
    transform: (doc, ret) => {
      delete ret._id;
    },
    versionKey: false,
    virtuals: true
  }
};

module.exports = options;
