import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

type WebhookBody = {
  _type: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Missing SANITY_REVALIDATE_SECRET" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body) as WebhookBody;

  if (payload._type) {
    revalidateTag(payload._type, "max");
  }
  if (payload.slug?.current) {
    revalidateTag(`post:${payload.slug.current}`, "max");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
