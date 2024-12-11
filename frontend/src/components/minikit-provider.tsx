import { ReactNode, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    MiniKit.install("app_46e97d278d72663d49e73237e429e10f");
    console.log(MiniKit.isInstalled());
  }, []);

  return <>{children}</>;
}
