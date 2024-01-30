import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logount(req: NextApiRequest, res: NextApiResponse) {
  const { mytoken } = req.cookies;

  if (!mytoken) {
    return res.status(403).json({ error: "no token" });
  }

  try {
    verify(mytoken, "secret");

    const serializeOptions:any = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    };

    // Set an empty string as the value to effectively remove the cookie
    const serializedToken = serialize('mytoken', '', serializeOptions);

    // Set the cookie with an empty value to effectively remove it
    res.setHeader("Set-Cookie", serializedToken);

    res.status(200).json("logout successfully");
  } catch (error) {
    return res.status(401).json("invalid logout");
  }
  
}
