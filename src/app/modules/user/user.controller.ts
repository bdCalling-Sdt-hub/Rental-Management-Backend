import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';

import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  // console.log("user body", req.body);
  const createUserToken = await userService.createUserToken(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Check email for OTP',
    data: { createUserToken },
  });
});

const userCreateVarification = catchAsync(async (req, res) => {
  const token = req.headers?.token as string;
  const { otp } = req.body;
  const newUser = await userService.otpVerifyAndCreateUser({ otp, token });

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
    data: newUser,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const payload = req.body;
  const newUser = await userService.createAdmin(payload);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin create successfully',
    data: newUser,
  });
});

// const userSwichRole = catchAsync(async (req, res) => {
//   const { userId } = req.user;
//   const newUser = await userService.userSwichRoleService(userId);

//   return sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Swich role successfully',
//     data: newUser,
//   });
// });

// rest >...............


const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.googleLogin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully',
    data: result,
  });
});


const appleLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.appleLogin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully',
    data: result,
  });
});




const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUserQuery(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    meta: result.meta,
    data: result.result,
    message: 'Users All are requered successful!!',
  });
});

const getAllLandlordWithProperty = catchAsync(async (req, res) => {
  const result = await userService.getAllLandlordWithPropertyQuery(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Users All landlord with property are requered successful!!',
  });
});

const getAllTenantUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllTenantUserQuery(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    meta: result.meta,
    data: result.result,
    message: 'Users All are requered successful!!',
  });
});

const getAllUserCount = catchAsync(async (req, res) => {
  const result = await userService.getAllUserCount();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Users All Count successful!!',
  });
});

const getAllUserRasio = catchAsync(async (req, res) => {
  const yearQuery = req.query.year;

  // Safely extract year as string
  const year = typeof yearQuery === 'string' ? parseInt(yearQuery) : undefined;

  if (!year || isNaN(year)) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Invalid year provided!',
      data: {},
    });
  }

  const result = await userService.getAllUserRatio(year);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Users All Ratio successful!!',
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUserById(req?.user?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile fetched successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.image = storeFile('profile', req?.file?.filename);
  }

  const result = await userService.updateUser(req?.user?.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'profile updated successfully',
    data: result,
  });
});

const blockedUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await userService.blockedUser(req.params.id, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Blocked successfully',
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.deleteMyAccount(req.user?.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  userCreateVarification,
  createAdmin,
  // userSwichRole,
  googleLogin,
  appleLogin,
  getUserById,
  getMyProfile,
  updateMyProfile,
  blockedUser,
  deleteMyAccount,
  getAllUsers,
  getAllLandlordWithProperty,
  getAllTenantUsers,
  getAllUserCount,
  getAllUserRasio,
};
