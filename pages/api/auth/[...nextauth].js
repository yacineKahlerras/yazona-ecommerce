import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "../../../utils/db";
import User from "../../../models/User";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;

      await db.connect();
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        session.user.isAdmin = dbUser.isAdmin;
        session.user._id = dbUser._id;
      } else {
        const newUser = new User({
          name: session.user.name,
          email: session.user.email,
          image: token.picture,
          isAdmin: session.user.isAdmin,
        });
        const newUserDoc = await newUser.save();
        session.user._id = newUserDoc._id;
      }
      await db.disconnect();
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
