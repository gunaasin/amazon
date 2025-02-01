export function getEmailFromJWT(token) {
    try {
    
      const payloadBase64 = token.split('.')[1]; 
      const decodedPayload = atob(payloadBase64); 
      const payload = JSON.parse(decodedPayload); 
      
     
      return payload.sub || null; 
    } catch (error) {
      if(error.message.includes("Invalid token") && curerentWindow.match("/checkout.html" )){
          window.location.href="./signin"
          console.error("Error decoding JWT:", error.message);
        }
      return null;
    }
  }