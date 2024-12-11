// VerifyBlock.js
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "test-action", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

interface VerifyBlockProps {
  onVerifySuccess: () => void;
}

export const VerifyBlock = ({ onVerifySuccess }: VerifyBlockProps) => {
  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // no need to verify if command errored
    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);

      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult,
        action: verifyPayload.action,
        signal: verifyPayload.signal, // Optional
      }),
    });

    const verifyResponseJson = await verifyResponse.json();

    if (verifyResponseJson.status === 200) {
      console.log("Verification success!");
      console.log(finalPayload);
      onVerifySuccess(); // Call the success callback
    }

    setHandleVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  }, [onVerifySuccess]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Verify Your Identity</h1>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
        onClick={handleVerify}
      >
        Verify
      </button>
      <span>{handleVerifyResponse && JSON.stringify(handleVerifyResponse, null, 2)}</span>
    </div>
  );
};
