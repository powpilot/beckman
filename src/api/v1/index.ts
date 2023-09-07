import { Router } from 'express';
import auth from './routes/auth.router';
import user from './routes/user.router';
import techdoc from './routes/techdoc.router';

export default () => {
	const app = Router();
    auth(app);
    user(app);
    techdoc(app);
	return app
}