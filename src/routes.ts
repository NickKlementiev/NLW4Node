import { Router } from 'express';
import {AnswerController} from './controllers/AnswerController';
import {NpsController} from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

/*
 * The router class is used instead of making direct accesses such as app.post("path")
 */

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);

router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };
