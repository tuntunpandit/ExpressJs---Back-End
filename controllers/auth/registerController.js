import Joi from "joi";
import CustomErrorHandler from '../../services/CustomErrorHandler';
const registerController = {
    async register(req, res, next) {

        // validate fields
        const registerSchema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cnfpass: Joi.ref('password')
        });

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // validate user already exist or not

        try {
            let exist = await User.exist({ email: req.body.email });
        } catch (err) {
            return next(CustomErrorHandler.alreadyExist("This email is already taken."));
        }
        res.json("helo");
    }
}

export default registerController;