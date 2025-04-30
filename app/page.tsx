"use client";

import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { useState } from "react";
import { Instrument, StepsGrid } from "@types";

import createSequence from "@lib/createSequence";
import { initSteps16 } from "@lib/initSteps";
import { defaultInstruments } from "@lib/presets/mixed";
import { createInstruments } from "@lib/createInstruments";

import Button from "@components/common/Button";
import SequenceRow from "@components/ui/SequenceRow";
import NoteSelector from "@components/ui/NoteSelector";
import OctaveSelector from "@components/ui/OctaveSelector";
import BpmControl from "@components/ui/BpmControl";

export default function Home() {
  //==================STATES AND REFS=========================
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const masterSequence = useRef<Tone.Sequence<any> | null>(null);
  const [stepsGrid, setStepsGrid] = useState<StepsGrid>([
    initSteps16(),
    initSteps16(),
    initSteps16(),
    initSteps16(),
    initSteps16(),
    initSteps16(),
  ]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  //==========================================================

  //===================PITCH CONTROL==========================
  const [currentNote, setCurrentNote] = useState<string>("C");
  const [currentOctave, setCurrentOctave] = useState<string>("4");
  //==========================================================

  useEffect(() => {
    setInstruments(createInstruments(defaultInstruments));
    setIsLoading(false);
  }, []);

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
      createSequence(masterSequence, setStepIndex, stepsGrid, instruments, 16);
    }
    return () => {
      masterSequence.current?.dispose();
    };
  }, [isPlaying, stepsGrid, instruments]);

  const handleNoteChange = (e: any) => {
    const [rowIndex, stepIndex] = e.target.id.split("-");
    const newStepsGrid = [...stepsGrid];
    const note = currentNote + currentOctave;
    const currentStep = newStepsGrid[rowIndex][stepIndex];
    newStepsGrid[rowIndex][stepIndex] = currentStep ? null : note;
    setStepsGrid(newStepsGrid);
  };

  if (isLoading) {
    return (
      <main className="m-16 flex flex-col items-center space-y-10 justify-center p-10  border border-accent1Light rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </main>
    );
  }
  return (
    <main className="m-16 flex flex-col items-center space-y-10 justify-center p-10  border border-accent1Light rounded-lg shadow-lg">
      <div className="flex items-center w-full justify-between">
        <Button
          onClick={handlePlayPause}
          text={isPlaying ? "Stop Sequence" : "Start Sequence"}
          className={"w-36 " + (isPlaying ? "bg-accent2Dark" : "")}
        />

        <NoteSelector
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
        />
        <OctaveSelector
          currentOctave={currentOctave}
          setCurrentOctave={setCurrentOctave}
        />

        <BpmControl />
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
              notes={stepsGrid[instrument.id]}
              isPlaying={isPlaying}
              currentStep={stepIndex}
              isPitched={instrument.isPitched}
            />
          );
        })}
      </div>
    </main>
  );
}
