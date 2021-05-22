import Joi from "joi";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";

const refreshTokenController = {

    async refreshToken(req, res, next) {
        //validation

        const refreshTokenSchema = Joi.object({
            refresh_token: Joi.string().required()
        });

        const { error } = refreshTokenSchema.validate(req.body);
        console.log('refresh validation', error);
        if (error) {
            return next(error);
        }

        // check token in database
        let refreshtoken;
        try {
            refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
            console.log('refreshtoken', refreshtoken);
            if (!refershtoken) {
                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
            }

            let userId;
            try {
                const { _id } = await JwtService.verify(refreshtoken.token, REFRESH_SECRET);
                userId = _id;
            } catch (err) {
                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
            }

            const user = await User.findOne({ _id: userId });
            if (!user) {
                return next(CustomErrorHandler.unAuthorized('No user found'));
            }

            // Token
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            // database whitelist token
            await RefreshToken.create({ token: refresh_token });
            res.json({ access_token, refesh_token });


        } catch (err) {
            return next(new Error("Something went wrong " + err.message));
        }
    }
}

export default refreshTokenController;