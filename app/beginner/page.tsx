"use client";
import useSequencer from "@hooks/useSequencer";
import SequencerUI from "@components/ui/SequencerUI";
import { useState } from "react";
import Toggle from "@components/common/Toggle";
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
  const [toggleInstrument, setToggleInstrument] = useState(false);

  const handleNoteChange = (e: any) => {
    const [rowIndex, stepIndex] = e.target.id.split("-");
    const newStepsGrid = [...stepsGrid];
    const note = currentNote + currentOctave;
    const currentStep = newStepsGrid[rowIndex][stepIndex];
    newStepsGrid[rowIndex][stepIndex] = currentStep ? null : note;
    setStepsGrid(newStepsGrid);
  };

  const handleInstrumentChange = () => {
    const index = toggleInstrument ? 1 : 0;
    const newStepsGrid = [...stepsGrid];
    newStepsGrid[index].fill(null);
    setStepsGrid(newStepsGrid);
    setToggleInstrument((prev) => !prev);
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
      extraControls={
        <Toggle
          onClickHandler={handleInstrumentChange}
          label={toggleInstrument ? "Melody" : "Percussion"}
        />
      }
      filterInstrument={(inst) => {
        if (toggleInstrument && inst.isPitched) {
          return true;
        }
        if (!toggleInstrument && !inst.isPitched) {
          return true;
        }
        return false;
      }}
    />
  );
}
