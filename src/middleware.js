import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// import { verify } from 'jsonwebtoken';//otro modulo toca con jose
import { jwtVerify } from "jose";
//OTRO IGUAL A JSONWEBTOCKEN ES JOSE
export default async function middleware(request) {
  const jwt = request.cookies.get("mytoken"); // Accede directamente a la propiedad mytoken en lugar de usar get()
  console.log(request.cookies);
  console.log(request.url);
  console.log(jwt);

  // if (request.nextUrl.pathname.includes("/Dashboar")) {
  if (!jwt) {
    //NO ES SEGURO ESTE METODO PORQUE PUEDEN DECIR QUE HAY UN JWT key o jsonwebtoken para mas espesifidad UTILIZA JOSE
    // Redirige utilizando un objeto de opciones
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  try {
    const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode('secret')); // Es chebre porque valida por el secre y lo demás, así es como funciona
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// return NextResponse.next(); //permite que visite otras rutas sino esta autenticado se aplica la condicion a todas
// }
//machers
const routes=["/home/home/:path*"]
export const config = {
  matcher: "/home/home/:path*,home/tables"
};
