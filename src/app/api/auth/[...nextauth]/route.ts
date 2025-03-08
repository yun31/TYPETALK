import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

const authOptions = NextAuth({
  providers: [
    //구글
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //어댑터 추가!
  adapter: MongoDBAdapter(connectMongoDB),
});
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
