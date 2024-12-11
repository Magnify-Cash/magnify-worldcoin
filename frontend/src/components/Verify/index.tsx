// VerifyBlock.ts
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useCallback } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "test-action", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Device, // Orb | Device
};

interface VerifyBlockProps {
  onVerifySuccess: () => void;
  onVerifyError: (
    error: MiniAppVerifyActionErrorPayload | IVerifyResponse | { status: "error"; message: string },
  ) => void;
}

export const VerifyBlock = ({ onVerifySuccess, onVerifyError }: VerifyBlockProps) => {
  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      onVerifyError({ status: "error", message: "MiniKit not installed" });
      return;
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (finalPayload.status === "error") {
        console.log("Command error");
        console.log(finalPayload);
        onVerifyError(finalPayload);
        return;
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
        onVerifySuccess();
      } else {
        onVerifyError(verifyResponseJson);
      }
    } catch (error) {
      console.error("Verification process failed:", error);
      onVerifyError({ status: "error", message: "Verification failed" });
    }
  }, [onVerifySuccess, onVerifyError]);

  return {
    handleVerify,
  };
};
