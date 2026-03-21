import { useState } from "react";

export default function MiniAccount() {
  const [name, setName] = useState("Sarah Jo");
  const [email, setEmail] = useState("@example.com");
  const [phone, setPhone] = useState("12345667");
  const [houseNumber, sethouseNumber] = useState("12");
  const [Street, setStreet] = useState("Bimringham Rd");
  const [City, setCity] = useState("Birmingham");
  const [Postcode, setPostcode] = useState("B1234AB");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
  setSaved(true);

  console.log("Saved", { 
    name, 
    email, 
    phone, 
    houseNumber, 
    Street, 
    City, 
    Postcode 
  });

  setTimeout(() => {
    setSaved(false);
  }, 3000);
};


  const handleDelete = () => {
    console.log("Account deleted");
  };

  return (
    <div className="flex flex-col space-y-8 mt-5">
        {saved && (
                <div className="fixed top-24 right-4 z-50 animate-slide-in">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                            <p className="font-semibold">Success!</p>
                            <p className="text-sm">Changes saved successfully.</p>
                        </div>
                        <button
                            onClick={() => setSaved(false)}
                            className="ml-4 text-white hover:text-gray-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        
        <div className="flex items-center">
        <p className="text-[#2c2c2c] w-20"><strong>Name:</strong></p>
        <input
          className="border-b border-gray-400 bg-transparent text-center text-[#2c2c2c] py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>

        <div className="flex items-center">
        <p className="text-[#2c2c2c] w-20"><strong>Email:</strong></p>
        <input
          className="border-b border-gray-400 bg-transparent text-center text-[#2c2c2c] py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div className="flex items-center">
        <p className="text-[#2c2c2c] w-20"><strong>Phone:</strong></p>
        <input
          className="border-b border-gray-400 bg-transparent text-center text-[#2c2c2c] py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        </div>

        <div className="flex items-center">
        <p className="text-[#2c2c2c] w-20"><strong>House Number:</strong></p>
        <input
          className="border-b border-gray-400 bg-transparent text-center text-[#2c2c2c] py-2"
          value={houseNumber}
          onChange={(e) => sethouseNumber(e.target.value)}
        />
        </div>

        <div className="flex items-center">
        <p className="text-[#2c2c2c] w-20"><strong>Street:</strong></p>
        <input
          className="border-b border-gray-400 bg-transparent text-center text-[#2c2c2c] py-2"
          value={Street}
          onChange={(e) => setStreet(e.target.value)}
        />
        </div>

        <div className="flex items-center">
        <p className="text-[#2c2c2c] w-20"><strong>City:</strong></p>
        <input
          className="border-b border-gray-400 bg-transparent text-center text-[#2c2c2c] py-2"
          value={City}
          onChange={(e) => setCity(e.target.value)}
        />
        </div>

        <div className="flex items-center">
        <p className="text-[#2c2c2c] w-20"><strong>Postcode:</strong></p>
        <input
          className="border-b border-gray-400 bg-transparent text-center text-[#2c2c2c] py-2"
          value={Postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        </div>

        <button
          onClick={handleSave}
          className="bg-[#2c2c2c] text-white py-2 rounded"
        >
          Save changes
        </button>

        <button
          onClick={handleDelete}
          className="text-sm text-red-500 underline"
        >
          Delete
        </button>
    </div>
  );
}