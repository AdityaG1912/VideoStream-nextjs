"use client";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./Notification";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

if (!urlEndPoint) {
  throw new Error("NEXT_PUBLIC_URL_ENDPOINT is not defined");
}
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ImageKitProvider urlEndpoint={urlEndPoint}>
      <NotificationProvider>
        <SessionProvider refetchInterval={5 * 60}>{children}</SessionProvider>
      </NotificationProvider>
    </ImageKitProvider>
  );
}
