import {
Html5QrcodeScanner,
} from "html5-qrcode";

import {
useEffect,
useState,
} from "react";

function ScanPage() {
const [scanResult, setScanResult] =
useState("");

useEffect(() => {
const scanner =
new Html5QrcodeScanner(
"reader",
{
fps: 5,
qrbox: {
width: 250,
height: 250,
},
},
false
);

scanner.render(
  (decodedText) => {
    setScanResult(decodedText);
  },
  (error) => {
    console.log(error);
  }
);

return () => {
  scanner
    .clear()
    .catch((error) =>
      console.log(error)
    );
};

}, []);

return ( <div className="p-8"> <h1 className="text-3xl font-bold mb-6">
QR Scanner </h1>

  <div
    id="reader"
    className="w-full max-w-md"
  ></div>

  <div className="mt-6 bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold">
      Scan Result:
    </h2>

    <p>{scanResult}</p>
  </div>
</div>

);
}

export default ScanPage;