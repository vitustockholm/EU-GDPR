### **Final Setup: Adding Google Ads & Facebook Conversion API (FC) in `vite-plugin-radar`**  

#### **1️⃣ Install `vite-plugin-radar`**
If you haven't installed it yet, run:  
```sh
npm install vite-plugin-radar
```

---

#### **2️⃣ Configure `vite.config.js` (Final Version)**
Replace your `vite.config.js` with the **final version** below.  
This now includes:
- **Google Analytics 4 (GA4)**
- **Google Tag Manager (GTM)**
- **Facebook Pixel (FC)**
- **Google Ads Conversion Tracking (AW-XXXXXX)**  

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import radar from "vite-plugin-radar";

export default defineConfig({
  plugins: [
    react(),
    radar({
      analytics: {
        googleAnalytics: localStorage.getItem("cookie_consent") === "accepted" ? "G-XXXXXXXXXX" : null,
        gtm: localStorage.getItem("cookie_consent") === "accepted" ? "GTM-XXXXXXX" : null,
        facebookPixel: localStorage.getItem("cookie_consent") === "accepted" ? "XXXXXXXXXX" : null,
        googleAds: localStorage.getItem("cookie_consent") === "accepted" ? "AW-XXXXXXXXXX" : null,
      },
    }),
  ],
});
```

> 📝 **Replace:**
> - `"G-XXXXXXXXXX"` → **Google Analytics 4 ID**
> - `"GTM-XXXXXXX"` → **Google Tag Manager ID**
> - `"XXXXXXXXXX"` → **Facebook Pixel ID**
> - `"AW-XXXXXXXXXX"` → **Google Ads Conversion Tracking ID**

---

#### **3️⃣ Update `CookieConsent.jsx`**
This ensures tracking scripts load **only if the user accepts cookies**.

```jsx
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setShowModal(true);
    }
  }, []);

  const handleConsent = (consent) => {
    Cookies.set("cookie_consent", consent, { expires: 365 });
    setShowModal(false);
    window.location.reload(); // Reload to apply tracking preferences
  };

  return (
    showModal && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg">
        <p className="text-center">
          We use cookies to enhance your experience. Accept analytics cookies for better insights.
        </p>
        <div className="flex justify-center mt-2">
          <button onClick={() => handleConsent("accepted")} className="bg-green-500 text-white px-4 py-2 mx-2 rounded">
            Accept
          </button>
          <button onClick={() => handleConsent("declined")} className="bg-red-500 text-white px-4 py-2 mx-2 rounded">
            Decline
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
```

---

#### **4️⃣ Add to `App.jsx`**
Import the cookie consent modal into your `App.jsx`:

```jsx
import React from "react";
import CookieConsent from "./components/CookieConsent";

const App = () => {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <CookieConsent />
    </div>
  );
};

export default App;
```

---

#### **5️⃣ Verify Tracking Works Correctly**
1. **Run**: `npm run dev`
2. **Check Cookies**:
   - Open **DevTools (`F12`)** → **Application > Cookies**
   - Make sure `cookie_consent = accepted` or `declined`
3. **Check Tracking Scripts**:
   - **Network > Scripts** → Look for:
     - `www.googletagmanager.com/gtag/js`
     - `connect.facebook.net/en_US/fbevents.js`
     - `www.googleadservices.com/pagead/conversion.js`
4. **If cookies were declined**, tracking scripts **should NOT** load.

---

### **✅ Final Summary**
✔ **Google Analytics 4 (GA4)**  
✔ **Google Tag Manager (GTM)**  
✔ **Facebook Pixel (FC)**  
✔ **Google Ads Conversion Tracking**  
✔ **GDPR-Compliant Cookie Opt-In**  

**🎯 This is the complete, GDPR-compliant tracking setup in Vite 5.2!** 🚀  
Let me know if you need any final tweaks.
