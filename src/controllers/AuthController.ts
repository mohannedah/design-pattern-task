import express from "express";
import { body, validationResult } from "express-validator";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { UserLoginDto } from "src/data/dto's/UserLoginDto";
import { UserRegisterDto } from "src/data/dto's/UserRegisterDto";
import { IAuthService } from "src/services/interfaces/IAuthService";

import jwt from "jsonwebtoken";




@controller('/auth')
export class AuthController {
      public readonly authService: IAuthService;
      constructor(@inject("IAuthService") authService: IAuthService) {
          this.authService = authService;
      }
      
      @httpPost("/login", body('email').isEmail(), body('password').isLength({min: 8}))
      async login(req: express.Request, res: express.Response) {
        try {
          const result = await this.authService.login(new UserLoginDto(req.body.email, req.body.password));
          if(result) {
              res.status(200).json({success: true, message: "User successfully logged in", result});
              return;
          } 
          return res.status(401).json({success: false, message: "Invalid username or password"});
        } catch (error) {
          res.status(500).json({success: false, message: "Internal Server Error"});
        }
      }

      @httpPost("/register", body('email').exists().isEmail(), body('password').exists().withMessage("Password field must be provided").isLength({min: 8}).withMessage("Password field must have a minimum length of 8 characters"), body("name").exists({}).withMessage("Name field must be provided"))
      async register(req: express.Request, res: express.Response) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(402).json({success: false, message: "Error validating the body of the request", errors: errors.array()})
        try {
          var result = await this.authService.register(new UserRegisterDto(req.body.name, req.body.email, req.body.password));
          
          if(result) return res.status(200).json({success: true, message: "User successfully registered"});
          return res.status(401).json({success: false, message: "User Already Exists"});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
      }
}