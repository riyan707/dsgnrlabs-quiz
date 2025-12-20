export function trackMetaEvent(eventName: "Lead" | "CompleteRegistration", params?: Record<string, any>) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;

  window.fbq("track", eventName, params ?? {});
}
