import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { villas } from "../../villas";
import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import QRCode from "qrcode";
import { verifyMessage } from "viem";
import { RECEIPT_ABI } from "../../web3/receiptAbi";
import { sepolia } from "wagmi/chains";

const SingleVilla = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const filteredVilla = useMemo(() => villas.find((villa) => villa.id === numericId), [numericId]);
  const { address, isConnected } = useAccount();
  const [signature, setSignature] = useState("");
  const [verified, setVerified] = useState(false);
  const { signMessageAsync, isPending: isSigning } = useSignMessage();
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [txHash, setTxHash] = useState("");
  const { data: hash, isPending: isMinting, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  if (!filteredVilla) {
    return (
      <section id="singleVilla" className="page">
        <div className="container">
          <h3>Villa not found</h3>
          <p>The requested property does not exist.</p>
        </div>
      </section>
    );
  }

  const message = `Booking Intent\nProperty: ${filteredVilla.name}\nLocation: ${filteredVilla.location}\nGuest Address: ${address ?? "not connected"}\nTimestamp: ${Date.now()}`;

  const signBookingIntent = async () => {
    try {
      const sig = await signMessageAsync({ message });
      setSignature(sig);
      const ok = await verifyMessage({ address, message, signature: sig });
      setVerified(ok);
      if (ok) {
        const payload = JSON.stringify({ address, name: filteredVilla.name, location: filteredVilla.location, signature: sig });
        const dataUrl = await QRCode.toDataURL(payload, { margin: 1, scale: 6 });
        setQrDataUrl(dataUrl);
      }
    } catch (e) {
      setVerified(false);
    }
  };

  const mintReceipt = async () => {
    if (!verified || !address) return;
    const uri = `data:application/json;utf8,${encodeURIComponent(JSON.stringify({
      name: `Booking Receipt - ${filteredVilla.name}`,
      description: `Proof of booking intent for ${filteredVilla.name} in ${filteredVilla.location}`,
      image: qrDataUrl,
      properties: { address, villaId: filteredVilla.id, signature }
    }))}`;
    try {
      const tx = await writeContractAsync({
        abi: RECEIPT_ABI,
        address: "0x0000000000000000000000000000000000000000",
        chainId: sepolia.id,
        functionName: "mint",
        args: [address, uri],
        value: 0n
      });
      setTxHash(tx);
    } catch {}
  };

  return (
    <>
      <section id="singleVilla" className="page">
        <div className="container">
          <h3>{filteredVilla.name}</h3>
          <div className="images">
            <div className="villaImg">
              <img src={filteredVilla.image} alt={filteredVilla.name} />
            </div>
            <div className="otherImgs">
              <div>
                <img src={"/landing.jpg"} alt="villa" />
                <img src={"/people.jpg"} alt="villa" />
              </div>
              <div>
                <img src={"/people2.jpg"} alt="villa" />
                <img src={"/villa10.jpg"} alt="villa" />
              </div>
            </div>
          </div>
          <h4>{filteredVilla.location}</h4>
          <p>
            {filteredVilla.bedrooms} Bedrooms / {filteredVilla.guests} Guests / {filteredVilla.bathrooms} Bathrooms / {filteredVilla.squareMeter} Area
          </p>
          <div className="checkin_out">
            <h5>
              Check In: <span> 9:00 AM</span>
            </h5>
            <h5>
              Check Out <span> 11:00 PM</span>
            </h5>
          </div>
          <div className="location">
            <h4>LOCATION</h4>
            {/* Add map url or co-ordinates */}
            <iframe
              src=" "
              style={{ width: "100%", height: "400px", border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <section id="booking" className="page">
        <div className="bookingCard">
          <h4>Web3 Booking Proof (Demo)</h4>
          <p>Demonstrate blockchain readiness by signing a booking intent with your wallet.</p>
          {!isConnected ? (
            <p>Connect your wallet from the top right to enable signing.</p>
          ) : (
            <div>
              <button className="btn btn--primary" onClick={signBookingIntent} disabled={isSigning}>
                {isSigning ? "Awaiting Signature..." : "Sign Booking Intent"}
              </button>
              {signature && (
                <div className={verified ? "alert alert--success" : "alert alert--error"}>
                  <p>Signature {verified ? "verified" : "verification failed"}.</p>
                </div>
              )}
              {verified && qrDataUrl && (
                <div style={{ marginTop: 12 }}>
                  <img src={qrDataUrl} alt="Booking QR" style={{ width: 160, height: 160 }} />
                  <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="btn" onClick={() => navigator.clipboard.writeText(signature)}>Copy Signature</button>
                    <a className="btn" href={qrDataUrl} download={`booking-proof-${filteredVilla.id}.png`}>Download QR</a>
                    <button className="btn" onClick={mintReceipt} disabled={isMinting || isConfirming}>
                      {isMinting ? 'Minting...' : isConfirming ? 'Confirming...' : 'Mint Booking Receipt (Sepolia)'}
                    </button>
                  </div>
                  {hash && (
                    <p style={{ marginTop: 6, fontSize: 14 }}>
                      Tx: <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">{String(hash).slice(0,10)}...</a>
                      {isConfirmed && ' (confirmed)'}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SingleVilla;