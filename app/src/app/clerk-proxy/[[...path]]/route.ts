import { clerkFrontendApiProxy } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

const clerkProxyOptions = {
  proxyPath: "/clerk-proxy",
};

function proxyClerkRequest(request: Request) {
  return clerkFrontendApiProxy(request, clerkProxyOptions);
}

export const GET = proxyClerkRequest;
export const POST = proxyClerkRequest;
export const PUT = proxyClerkRequest;
export const PATCH = proxyClerkRequest;
export const DELETE = proxyClerkRequest;
export const OPTIONS = proxyClerkRequest;
export const HEAD = proxyClerkRequest;
