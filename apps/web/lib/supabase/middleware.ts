import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Auth routes (accessible without authentication, redirect away if already authed)
const AUTH_ROUTES = [
  '/login',
  '/register',
  '/signin',
  '/signup',
  '/forgot-password',
  '/accept-invite',
];

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

function isDashboardRoute(pathname: string) {
  return pathname.startsWith('/dashboard');
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Auth routes — redirect to dashboard if already authenticated
  // (except accept-invite which should work even when logged in)
  if (
    user &&
    isAuthRoute(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.startsWith('/accept-invite')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Authenticated users on marketing homepage → redirect to dashboard
  if (user && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Only protect dashboard routes — all other routes are public
  if (!isDashboardRoute(request.nextUrl.pathname)) {
    return supabaseResponse;
  }

  // Dashboard routes — redirect to signin if not authenticated
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Resolve tenant context for authenticated users on dashboard routes
  const { data: membership } = await supabase
    .from('tenant_members')
    .select('tenant_id, role')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .single();

  if (membership) {
    supabaseResponse.headers.set('x-tenant-id', membership.tenant_id);
    supabaseResponse.headers.set('x-user-role', membership.role);
  }

  return supabaseResponse;
}
