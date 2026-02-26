import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Hem isimlendirilmiş hem de default export kullanarak hatayı garantiye alıyoruz
export async function proxy(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // 1. /admin/login sayfasındaysak döngüye girmemesi için direkt geçiş ver
  if (pathname === '/admin/login') {
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // 2. Diğer tüm /admin yolları için oturum kontrolü
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Next.js bazı durumlarda default export bekler
export default proxy;

export const config = {
    matcher: [
      /*
       * Aşağıdaki yollar DIŞINDAKİ tüm isteklerde çalışır:
       * - api (API rotaları)
       * - _next/static (statik dosyalar)
       * - _next/image (resim optimizasyon dosyaları)
       * - favicon.ico (favicon dosyası)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  };