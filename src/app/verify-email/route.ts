import { NextRequest, NextResponse } from 'next/server';
import { routes } from '@/common/routes';
import { serviceClient } from '@/server/services/service_client';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');

  if (!userId || !secret) {
    return NextResponse.redirect(routes.signIn);
  }
  const { account } = await serviceClient.user.guest();

  await account.updateVerification(userId, secret);
  return NextResponse.redirect(`${request.nextUrl.origin}${routes.profile}`);
}
