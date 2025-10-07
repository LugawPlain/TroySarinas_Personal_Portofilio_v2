"use client";

import { useEffect, useState } from "react";

export default function BuyMeACoffeeButton() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const safariCheck = /^((?!chrome|android).)*safari/i.test(ua);
    setIsSafari(safariCheck);
  }, []);

  if (isSafari) {
    return (
      <a
        href="https://www.buymeacoffee.com/troysarinas"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style={{ height: 40, width: 150 }}
        />
      </a>
    );
  }

  return (
    <a
      href="https://www.buymeacoffee.com/troysarinas"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=troysarinas&button_colour=FFDD00&font_colour=000000&font_family=Comic&outline_colour=000000&coffee_colour=ffffff"
        alt="Buy Me A Coffee"
      />
    </a>
  );
}
