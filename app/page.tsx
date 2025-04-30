"use client";

import Button from "@components/common/Button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main>
      <div className="m-16 flex flex-col items-center space-y-10 justify-center p-10">
        <Button
          className="w-52"
          onClick={() => router.push("/beginner")}
          text="Beginner Sequencer"
        />
        <Button
          className="w-52"
          onClick={() => router.push("/basic")}
          text="Basic Sequencer"
        />
        <Button
          className="w-52"
          onClick={() => router.push("/full")}
          text="Full Sequencer"
        />
      </div>
    </main>
  );
}
