import { COOKIE_NAME } from '@/server/config/server.config';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionWithSecret } from '@/server/data-access/session';
import { routes } from '@/common/routes';
import { createCookie } from '@/server/utils/cookies';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');

  if (!userId || !secret) {
    return NextResponse.redirect(routes.signIn);
  }

  const sessionSecret = await createSessionWithSecret(userId, secret);
  await createCookie(COOKIE_NAME, sessionSecret);
  return NextResponse.redirect(`${request.nextUrl.origin}${routes.oauthRedirection}`);
}
