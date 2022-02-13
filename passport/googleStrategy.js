const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const { Op } = require('sequelize');
const user = require('../models/index').models.user;
const PK = require('../middleware/Pk');
require('../config/env');

module.exports = () => {
    passport.use(new googleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT,
      },
     async (accessToken, refreshToken, profile, done) => {
      const myprofile = profile._json
      console.log(myprofile.sub);
      try{
         
         const myprofile = profile._json;
         const exSnsid = await user.findOne({
           where: {
             [Op.and]: [{us_email: myprofile.email}, {us_sns_id: myprofile.sub}] 
           }
         });
         if (exSnsid) {
            done(null, exSnsid);
         } else {
           let us_code = await PK.addPK('us');
           let check = await user.findOne({
             where: { us_code }
           });
           while (check != null) {
             us_code = await PK.addPK('us');
             check = await user.findOne({
               where: { us_code }
             });
           }
           const newUser = await user.create({
             us_code,
             us_email: myprofile.email,
             us_name: myprofile.name,
             us_sns_id: myprofile.sub, //password null
             us_admin: 'Y',
             us_ws_invite: 'Y',
             us_workspace: 'ws_220112_123456'
           });
           done(null, newUser);
         }
      } catch (error){
         console.error(error);
         done(error);
      }
      }))
}