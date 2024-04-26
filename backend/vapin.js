const webPush = require("web-push");
const base64Url = require("base64-url");

// Replace with your public and private VAPID keys
const publicVapidKey =
  "BKljO5lup7IRzj6qth6NVEgivc1Czp_v-nRKdv8JY4g4qu7I5gJ8hdgA2Yr5EDmkqy1xGzLLJGeDfd_vtprWKTs";
const privateVapidKey = "GlRR_50uxSIYnpxSUotqjG-D3nSLK7zjp3Z8Hl8-HQk";

// Create the VAPID details
const vapidDetails = {
  subject: "mailto:jerald.sarte@bisu.edu.ph",
  publicKey: publicVapidKey,
  privateKey: privateVapidKey,
};

// Generate the Authorization header
const authorizationHeader = `Bearer ${base64Url.encode(
  JSON.stringify(vapidDetails)
)}`;

console.log("Authorization Header: ", authorizationHeader);
