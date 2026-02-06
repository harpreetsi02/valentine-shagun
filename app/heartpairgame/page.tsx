"use client";

import { useState } from "react";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "../components/ValentinesProposal";
import TextFooter from "../components/TextFooter";

export default function HeartGamePage() {
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      {!done ? (
        <>
          <PhotoPairGame onComplete={() => setDone(true)} />
          <TextFooter />
        </>
      ) : (
        <ValentinesProposal />
      )}
    </div>
  );
}
