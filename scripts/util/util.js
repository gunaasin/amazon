export function getEmailFromJWT(token) {
    try {
      // Split the JWT into its components
      const payloadBase64 = token.split('.')[1]; // Get the payload part
      const decodedPayload = atob(payloadBase64); // Decode from Base64
      const payload = JSON.parse(decodedPayload); // Parse as JSON
      
      // Extract the email from the payload
      return payload.sub || null; // Return email if it exists, otherwise null
    } catch (error) {
      if(error.message.match("")){
        console.error("Error decoding JWT:", error);
    }
      return null;
    }
  }