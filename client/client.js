const publicVapidKey =
  "BIBWT5RYEctp-kjznLC0aNEu9JZTB8QCii2AqugRnwGemLFE0fz59cC5ZJJTnliBEbQI-jgSZ8swWmZlRQHA5Yg";

//chack service worker

if ("serviceWorker" in navigator) {
  //navigator is the api of browser itself
  send().catch((err) => console.error(err));
}

//Register Service Worker, Register Push, Send Push

//Register Service Worker
async function send() {
  console.log("Registering Service Worker...");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("Service Worker Registered..");

  // Register Push
  console.log("Registering Push..");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Push Registered..");
  //send Push Notification
  console.log("Sending push..");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });

  console.log("Push Sent");
}

//functions
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
