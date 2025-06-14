import { Error, Schema, Types, model } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import { gender, Role, USER_ROLE } from './user.constants';



const userSchema = new Schema<TUser>(
  {
    image: {
      type: String,
      default: '/uploads/profile/default-user.jpg',
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Role,
      required: true,
    },
    type: {
      type: String,
      enum: ['regular', 'google', 'apple'],
      default: 'regular',
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    loginId: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
      default: null,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    dateOfBirth: {
      type: String,
      required: false,
      default: null,
    },
    nationalIdNum: {
      type: String,
      required: false,
      default: null,
    },
    emergencyContactPerson: {
      type: String,
      required: false,
      default: null,
    },
    emergencyContactPersonNum: {
      type: String,
      required: false,
      default: null,
    },
    additionalInfo: {
      type: String,
      required: false,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    paymentAccount: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  if (this.password) {
    try {
      const user = this;
      user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds), 
      );
    } catch (error:any) {
      next(error); 
    }
  }
  next(); 
});

// set '' after saving password
userSchema.post(
  'save',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (error: Error, doc: any, next: (error?: Error) => void): void {
    doc.password = '';
    next();
  },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Remove password field
  return user;
};

// filter out deleted documents
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  // console.log({ email });
  return await User.findOne({ email: email }).select('+password');
};

userSchema.statics.isUserActive = async function (email: string) {
  return await User.findOne({
    email: email,
    isDeleted: false,
    isActive: true,
  }).select('+password image fullName email role');
};

userSchema.statics.IsUserExistById = async function (id: string) {
  return await User.findById(id).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
