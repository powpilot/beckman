import { Router, Request, Response } from "express";
import AuthService from "../services/auth.service";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  
  /**
   * /auth/signup
   */
  route.post("/signup", async (req: Request, res: Response) => {
   const service = new AuthService();
   console.log("body"+Object.keys(req))
   console.log("body"+JSON.stringify(req.body))
   console.log("params"+JSON.stringify(req.params))
   console.log("query"+JSON.stringify(req.query))
   const response = await service.signup(req.body);
   res.json(response);
  });


  route.post("/signin", async (req: Request, res: Response) => {
    const service = new AuthService();
    const response = await service.signin(req.body);
    res.json(response);
  });
};
