"use client";
import useSequencer from "@hooks/useSequencer";
import SequencerUI from "@components/ui/SequencerUI";
import { useState } from "react";
import { basicInstruments } from "@lib/presets/mixed";
import Loading from "@components/ui/Loading";

export default function Page() {
  const {
    isLoading,
    isPlaying,
    stepIndex,
    stepsGrid,
    setStepsGrid,
    instruments,
    handlePlayPause,
  } = useSequencer(8, basicInstruments);

  const [currentNote, setCurrentNote] = useState("C");
  const [currentOctave, setCurrentOctave] = useState("4");

  const handleNoteChange = (e: any) => {
    const [rowIndex, stepIndex] = e.target.id.split("-");
    const newStepsGrid = [...stepsGrid];
    const note = currentNote + currentOctave;
    const currentStep = newStepsGrid[rowIndex][stepIndex];
    newStepsGrid[rowIndex][stepIndex] = currentStep ? null : note;
    setStepsGrid(newStepsGrid);
  };

  if (isLoading) return <Loading />;

  return (
    <SequencerUI
      isPlaying={isPlaying}
      handlePlayPause={handlePlayPause}
      currentNote={currentNote}
      setCurrentNote={setCurrentNote}
      currentOctave={currentOctave}
      setCurrentOctave={setCurrentOctave}
      instruments={instruments}
      stepsGrid={stepsGrid}
      handleNoteChange={handleNoteChange}
      stepIndex={stepIndex}
    />
  );
}
