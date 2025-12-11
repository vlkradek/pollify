import { auth } from "@/auth"; // your NextAuth instance

export default auth(async (req) => {
  const session = req.auth;

  // Block unauthenticated users
  if (!session) {
    return Response.redirect(new URL("/login", req.url));
  }

  // allow request to continue
  return;
});

// protect /account and subpaths
export const config = {
  matcher: ["/account/:path*"],
};
