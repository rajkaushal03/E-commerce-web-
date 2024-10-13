import passport from "passport";
import dotenv from "dotenv";
import User from "../models/user.model.js"; // Import the User model
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; 

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user.id);  // Serialize by user ID
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);  // Deserialize by ID
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Check if the user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If not, create a new user
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,  // Use the first email
            picture: profile.photos[0].value, // Use the profile picture
          });
          await user.save();  // Save the new user
        }

        // Return the user
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  ) 
);
