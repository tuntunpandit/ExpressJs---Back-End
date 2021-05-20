import Joi from "joi";
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { User, RefreshToken } from '../../models';
import bcrypt from 'bcrypt';
import { REFRESH_SECRET } from '../../config';

const registerController = {
    async register(req, res, next) {        
        console.log(req.body);
        // validate fields
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cnf_password: Joi.ref('password')
        });

        const { fieldValidationError } = registerSchema.validate(req.body);
        
        console.log("fieldValidationError", fieldValidationError);
        if (fieldValidationError) {
            return next(fieldValidationError);
        }

        // validate email already exist or not

        try {
            const exist = await User.exists({ email: req.body.email });
            if(exist) {
                return next(CustomErrorHandler.emailAlreadyExist("This email is already taken."));
            }
        } 
        catch (err) {
            return next(err);
        }      

        const { name, email, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare model 
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        let access_token;
        let refresh_token;

        try {
            const result = await user.save();
            //token 
            access_token = JwtService.sign({_id: result._id, role: result.role});
            refresh_token = JwtService.sign({_id: result._id, role: result.role}, '1y', REFRESH_SECRET);

            // database whitelist 
            await RefreshToken.create({token: refresh_token});
        }
        catch(err) {
            return next(err);
        }

        res.json({ access_token, refresh_token });
    }

    
}

export default registerController;