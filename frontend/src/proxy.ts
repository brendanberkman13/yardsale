import { auth } from "@/auth";

export default auth((req) => {
  const isProtected = req.nextUrl.pathname.startsWith("/postings/new");
  if (isProtected && !req.auth) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});
