import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import { announcementController } from './announcements.controller';

const announcementsRouter = express.Router();

announcementsRouter
  .post(
    '/create-announcement',
    auth(USER_ROLE.LANDLORD),
    announcementController.createAnnouncement,
  )
  .get(
    '/',
    auth(USER_ROLE.LANDLORD),
    announcementController.getAllAnnouncementByLandlordByall,
  )
  .get(
    '/tenant',
    announcementController.getAllAnnouncementByLandlord,
  )
  // .get(
  //   '/tenant/:id',
  //   announcementController.getAllAnnouncementByLandlord,
  // )
  .get('/single/:id', announcementController.getSingleAnnouncement)
  .delete('/:id', auth(USER_ROLE.LANDLORD), announcementController.getSingleAnnouncementDeleted);

export default announcementsRouter;


