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
