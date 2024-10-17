import React from "react";

const AppStores = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-800 dark:text-gray-200 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-6">
        {/* <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex justify-center p-6"> */}
          {/* <a
            href=""
            target="_blank"
            rel="noreferrer"
            className="block text-center"
          > */}
            <img
              src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
              alt="Google Play"
              className="max-w-[50%] h-auto justify-center" 
            />
          {/* </a> */}
        {/* </div> */}

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex justify-center">
          <img
            src="https://www.movemate.com/qr-code.png"
            alt="QR Code"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AppStores;
