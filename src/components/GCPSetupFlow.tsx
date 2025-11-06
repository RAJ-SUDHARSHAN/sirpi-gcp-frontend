"use client";

import React, { useState } from "react";
import { apiCall } from "@/lib/api-client";
import { ExternalLinkIcon } from "@/components/ui/icons";
import toast from "react-hot-toast";

export default function GCPSetupFlow() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectGCP = async () => {
    try {
      setIsConnecting(true);
      toast.loading("Starting GCP authentication...", { id: "gcp-auth" });

      // Store current path for redirect after OAuth
      if (typeof window !== "undefined") {
        document.cookie = `oauth_return_path=${window.location.pathname}; path=/; max-age=600`;
      }

      const response = await apiCall("/gcp/auth/start");

      if (response.ok) {
        const data = await response.json();
        toast.dismiss("gcp-auth");
        // Redirect to Google OAuth
        window.location.href = data.authorization_url;
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to start GCP authentication", {
          id: "gcp-auth",
        });
      }
    } catch {
      toast.error("Failed to connect to GCP", { id: "gcp-auth" });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleConnectGCP}
      disabled={isConnecting}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 font-medium shadow-lg"
    >
      {isConnecting ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <ExternalLinkIcon className="w-5 h-5" />
          <span>Connect GCP</span>
        </>
      )}
    </button>
  );
}
