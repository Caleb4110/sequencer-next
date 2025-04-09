"use client";

import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { useState } from "react";
import { Instrument } from "./types/types";
import createSequence from "./lib/createSequence";
import { defaultKit } from "./lib/presets/kits";
import { createInstruments } from "./lib/createInstruments";
import SequenceRow from "@components/common/SequenceRow";
import Button from "@components/common/Button";
import initSteps from "./lib/initSteps";
import Slider from "@components/common/Slider";

export default function Home() {
  //==================STATES AND REFS=========================
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const masterSequence = useRef<Tone.Sequence<any> | null>(null);
  const [sequences, setSequences] = useState<boolean[][]>([
    initSteps(),
    initSteps(),
    initSteps(),
    initSteps(),
    initSteps(),
    initSteps(),
  ]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [instruments, setInstruments] = useState<Instrument[]>(
    createInstruments(defaultKit),
  );
  const [bpm, setBpm] = useState<number>(120);
  //====================================================

  const handlePlayPause = async () => {
    // Runs first time to start the audio context
    if (Tone.getContext().state !== "running") {
      Tone.setContext(new Tone.Context({ latencyHint: "playback" }));
      await Tone.start();
    }

    // Starts/stops the transport
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        Tone.getTransport().start();
      } else {
        Tone.getTransport().stop();
        setStepIndex(0);
      }
      return !prevIsPlaying;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      createSequence(masterSequence, setStepIndex, sequences, instruments);
    }
    return () => {
      masterSequence.current?.dispose();
    };
  }, [isPlaying, sequences, instruments]);

  const handleNoteChange = (e: any) => {
    const [rowIndex, stepIndex] = e.target.id.split("-");
    const newSequences = [...sequences];
    console.log(rowIndex, stepIndex);
    newSequences[rowIndex][stepIndex] = !newSequences[rowIndex][stepIndex];
    setSequences(newSequences);
  };

  const handleTempoChange = (e: any) => {
    const newBpm = Number.parseInt(e.target.value);
    setBpm(newBpm);
  };

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  return (
    <main className="m-16 flex flex-col items-center space-y-10 justify-center p-10 bg-bgDarkSecondary border border-accent1Dark rounded-lg shadow-lg">
      <div className="flex items-center w-full justify-between">
        <Button
          onClick={handlePlayPause}
          text={isPlaying ? "Stop Sequence" : "Start Sequence"}
          className={"w-36 " + (isPlaying ? "bg-accent2Dark" : "")}
        />
        <div className="flex space-x-5 items-center">
          <h3>Tempo</h3>
          <h3>{bpm} bpm</h3>
          <Slider onChange={handleTempoChange} value={bpm} min={60} max={240} />
        </div>
      </div>

      <div className="flex flex-col space-y-7 justify-center items-center">
        {instruments.map((instrument) => {
          console.log(instrument.id);
          return (
            <SequenceRow
              key={instrument.id}
              rowName={instrument.name}
              rowIndex={instrument.id}
              handleNoteChange={handleNoteChange}
              notes={sequences[instrument.id]}
              isPlaying={isPlaying}
              currentStep={stepIndex}
            />
          );
        })}
      </div>
    </main>
  );
}
