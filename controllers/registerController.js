import Joi from "joi";
import CustomErrorHandler from '../services/CustomErrorHandler';
import JwtService from '../services/JwtService';
import { User } from '../models';

const registerController = {
    async register(req, res, next) {        

        // validate fields
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cnf_password: Joi.ref('password')
        });

        const { fieldValidationError } = registerSchema.validate(req.body);

        if (fieldValidationError) {
            return next(fieldValidationError);
        }

        // validate email already exist or not

        try {
            const exist = await User.exist({ email: req.body.email });
            if(exist) {
                return next(CustomErrorHandler.emailAlreadyExist("This email is already taken."));
            }
        } 
        catch (err) {
            return next(err);
        }      

        // Hash password

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Prepare model 
        const { name, email, password } = req.body;
        const user = {
            name: name,
            email: email,
            password: hashedPassword
        }

        let access_token;

        try {
            const result = await User.save();
            console.log(result);
            //token 
            access_token = JwtService.sign({_id: result._id, role: result.role});
        }
        catch(err) {
            return next(err);
        }

        res.json({ access_token: access_token})
    }

    
}

export default registerController;