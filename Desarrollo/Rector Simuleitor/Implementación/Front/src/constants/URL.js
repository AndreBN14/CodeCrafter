let URL;

if (import.meta.env.DEV) {
  URL = "http://localhost:8000";
} else {
  URL = "https://backend-rs-production.up.railway.app";
}

export default URL;
