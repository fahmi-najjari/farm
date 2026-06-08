import { createHmac, randomBytes, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "farm_admin_session";

const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type AdminSessionPayload = {
  exp: number;
  nonce: string;
  role: "ADMIN";
};

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}

export function verifyAdminPassword(username: string, password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!isAdminAuthConfigured() || !expectedPassword) {
    return false;
  }

  return (
    secureCompare(username, getAdminUsername()) &&
    secureCompare(password, expectedPassword)
  );
}

export function createAdminSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    exp: now + SESSION_DURATION_SECONDS,
    nonce: randomBytes(16).toString("hex"),
    role: "ADMIN",
  };
  const encodedPayload = encode(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token || !isAdminAuthConfigured()) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return false;
  }

  if (!secureCompare(signature, sign(encodedPayload))) {
    return false;
  }

  try {
    const payload = JSON.parse(decode(encodedPayload)) as AdminSessionPayload;

    return payload.role === "ADMIN" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function getAdminSessionMaxAge() {
  return SESSION_DURATION_SECONDS;
}

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    return "";
  }

  return createHmac("sha256", secret).update(value).digest("base64url");
}

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function secureCompare(left: string, right: string) {
  const leftBuffer = createHmac("sha256", "compare").update(left).digest();
  const rightBuffer = createHmac("sha256", "compare").update(right).digest();

  return timingSafeEqual(leftBuffer, rightBuffer);
}
