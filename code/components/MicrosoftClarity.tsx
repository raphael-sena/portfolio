"use client";

import clarity from "@microsoft/clarity";
import { useEffect } from "react";

interface MicrosoftClarityProps {
  projectId: string;
}

export default function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  useEffect(() => {
    clarity.init(projectId);
  }, [projectId]);

  return null;
}
