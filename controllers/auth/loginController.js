import Joi from 'joi';
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";

const loginController = {
    async login(req, res, next) {

        // Validate fields
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

        const { validationError } = loginSchema.validate(req.body);

        if(validationError) {
            req.next(validationError);
        }

        // check user exist or not
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            // compare the password
            const matchPass = await bcrypt.compare(req.body.password, user.password);
            if(!matchPass) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Token 
            const access_token = JwtService.sign({_id: user._id, role: user.role});

            res.json({access_token});


        }
        catch(err) {
            return next(err);
        }
    }
};


export default loginController;