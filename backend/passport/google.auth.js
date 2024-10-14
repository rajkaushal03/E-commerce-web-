import passport from "passport";
import dotenv from "dotenv";
import User from "../models/user.model.js"; // Import the User model
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user.id); // Serialize by user ID
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id); // Deserialize by ID
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
      // Check if the user already exists
      const user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // If not, create a new user
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value, // Use the first email
          picture: profile.photos[0].value, // Use the profile picture
        });
        await newUser.save();
        done(null, newUser);
      } else {
        done(null, user);
      }
      // Return the user
    }
  )
);
