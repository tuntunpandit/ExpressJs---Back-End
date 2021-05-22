import Joi from 'joi';
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User, RefreshToken } from "../../models";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";

const loginController = {
    async login(req, res, next) {

        // Validate fields
        console.log("login", req.body);
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

        const { validationError } = loginSchema.validate(req.body);

        if (validationError) {
            req.next(validationError);
        }
        // check user exist or not
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            // compare the password
            const matchPass = await bcrypt.compare(req.body.password, user.password);
            if (!matchPass) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // Token
            const jwt_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);

            await RefreshToken.create({ token: refresh_token });
            res.json({ jwt_token, refesh_token });

        }
        catch (err) {
            return next(err);
        }
    },

    async logout(req, res, next) {
        // validate

        const refreshTokenSchema = Joi.object({
            refresh_token: Joi.string().required()
        });

        const { error } = refreshTokenSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            await RefreshToken.deleteOne({ token: req.body.refresh_token });
        } catch (err) {
            return next(new Error("Something went wrong in database"));
        }

        res.json({ status: 1 });
    }
};


export default loginController;