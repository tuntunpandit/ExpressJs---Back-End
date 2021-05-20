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

        if(error) {
            return next(error);
        }

        // check token in database
        let refreshtoken;
        try {
            refreshtoken = await RefreshToken.findOne({token: req.body.refresh_token});
            if(!refershtoken) {
                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
            }

            let userId;
            try {
                const { _id } = await JwtService.verify(refreshtoken.token, REFRESH_SECRET);
                userId = _id;
            } catch(err) {
                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
            }

            const user = await User.findOne({ _id: userId });
            if(!user) {
                return next(CustomErrorHandler.unAuthorized('No user found'));
            }

            
        } catch(err) {
            return next(new Error("Something went wrong " + err.message));
        }
    }
}

export default refreshTokenController;