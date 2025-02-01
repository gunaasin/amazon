export function getEmailFromJWT(token) {
  try {
    if (!token || typeof token !== "string") {
        throw new Error("Invalid token: Token is undefined or not a string");
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
    }

    // Convert Base64URL to Base64
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');

    // Decode from Base64
    const decodedPayload = atob(base64);

    // Parse as JSON
    return JSON.parse(decodedPayload);
} catch (error) {
  const curerentWindow = window.location.href;
  if(error.message.includes("Invalid token") && curerentWindow.match("/checkout.html" )){
    window.location.href="./signin"
      console.error("Error decoding JWT:", error.message);

    }
    return null;
}
  }