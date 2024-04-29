require('dotenv').config();

import 'reflect-metadata';


import {Container} from "inversify"
import { InversifyExpressServer } from 'inversify-express-utils';
import "./data/database_interfaces/DbContextNative"
import { DbContextNative } from './data/database_interfaces/DbContextNative';
import { IAuthService } from './services/interfaces/IAuthService';
import { AuthService } from './services/AuthService';
import { ITeacherRepo } from './data/repositories/interfaces/ITeacherRepo';
import { TeacherRepoNative } from './data/repositories/native_repositories/TeacherRepoNative';
import express from 'express';
import bodyParser from 'body-parser';
import "./controllers/AuthController"
import "./controllers/TeacherController"
import "./controllers/CoursesController"
import "./controllers/ExamController"
import { ICourseRepo } from './data/repositories/interfaces/ICourseRepo';
import { CourseRepoNative } from './data/repositories/native_repositories/CourseRepoNative';
import { IExamService } from './services/interfaces/IExamService';
import { ExamService } from './services/ExamService';
import { IExamRepo } from './data/repositories/interfaces/IExamRepo';
import { ExamRepoNative } from './data/repositories/native_repositories/ExamRepoNative';

const cors = require("cors");
const session = require("express-session");


const registerServices = function(container: Container) {
    container.bind<DbContextNative>("DbContextNative").toConstantValue(new DbContextNative());
    container.bind<IAuthService>("IAuthService").to(AuthService);
    container.bind<ITeacherRepo>("ITeacherRepo").to(TeacherRepoNative);
    container.bind<ICourseRepo>("ICourseRepo").to(CourseRepoNative);
    container.bind<IExamService>("IExamService").to(ExamService);
    container.bind<IExamRepo>("IExamRepo").to(ExamRepoNative);
}


const bootstrap = async function() : Promise<void>{
    const container: Container = new Container();

    registerServices(container);
    

    const app = new InversifyExpressServer(container);
    app.setConfig((app) => {
      app.use(express.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cors());
      });

    const server = app.build();
    await server.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
}

bootstrap();



