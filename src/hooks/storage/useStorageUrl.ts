import { useEffect, useState } from "react";
import { storageService } from "../../services/storage.service";

export const useStorageUrl = (path?: string | null) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!path) return;

    const loadUrl = async () => {
      try {
        const result = await storageService.getFileUrl(path);
        setUrl(result);
      } catch (error) {
        console.error("Error loading storage url:", error);
      }
    };

    loadUrl();
  }, [path]);

  return url;
};