"use client";

import { useEffect, useState } from "react";
import * as Tone from "tone";
import Button from "@components/common/Button";
import SequenceRow from "@components/common/SequenceRow";

const subdivisionTable = {
  "1/4": "4n",
  "1/8": "8n",
  "1/16": "16n",
};

console.log(Tone.getContext().latencyHint);

export default function Home() {
  const [subdivision, setSubdivision] = useState<string>("4n");
  const [currentNote, setCurrentNote] = useState<string>("C");
  const [currentOctave, setCurrentOctave] = useState<string>("4");
  const [instruments, setInstruments] = useState<any[]>([
    new Tone.Synth({
      envelope: {
        attack: 0.0,
        decay: 0.1,
        sustain: 0.01,
        release: 0.0,
      },
    }).toDestination(),
    new Tone.Synth({
      envelope: {
        attack: 0.0,
        decay: 0.1,
        sustain: 0.01,
        release: 0.0,
      },
    }).toDestination(),
  ]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const [steps, setSteps] = useState<any[][]>([
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ]);

  const [sequences, setSequences] = useState<Tone.Sequence[] | null>(null);

  const handleSubdivisionChange = (e: any) => {
    e.preventDefault();

    setSubdivision(
      subdivisionTable[e.target.value as keyof typeof subdivisionTable],
    );
  };

  // Changes the notes array when a note is selected/deselected
  const handleStepClick = (e: any) => {
    e.preventDefault();
    const split = e.target.id.split("-");
    const row = Number.parseInt(split[0]);
    const col = Number.parseInt(split[1]);

    setSteps((prevSteps) => {
      const newSteps = [[...prevSteps[0]], [...prevSteps[1]]];
      const noteOrNull = newSteps[row][col]
        ? null
        : currentNote + currentOctave;
      newSteps[row][col] = noteOrNull;
      return newSteps;
    });
  };

  const handleNoteChange = (e: any) => {
    e.preventDefault();
    setCurrentNote(e.target.value);
  };

  const handleOctaveChange = (e: any) => {
    e.preventDefault();
    setCurrentOctave(e.target.value);
  };

  const HandlePlayPause = async () => {
    if (Tone.getContext().state !== "running") {
      Tone.setContext(new Tone.Context({ latencyHint: "playback" }));
      await Tone.start();
    }
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        Tone.getTransport().start("+0.1");
      } else {
        Tone.getTransport().stop();
        setStepIndex(0);
      }
      return !prevIsPlaying;
    });
  };

  // Handles changes to the sequence
  useEffect(() => {
    const newSequences = [
      new Tone.Sequence(
        (time, note) => {
          instruments[0].triggerAttackRelease(note, subdivision, time + 0.1);
        },
        steps[0],
        subdivision,
      ).start(Tone.getTransport().progress),

      new Tone.Sequence(
        (time, note) => {
          instruments[1].triggerAttackRelease(note, subdivision, time + 0.1);
        },
        steps[1],
        subdivision,
      ).start(Tone.getTransport().progress),

      new Tone.Sequence(
        () => {
          setStepIndex((prevIndex) => (prevIndex + 1) % 8);
        },
        ["A4", "A4", "A4", "A4", "A4", "A4", "A4", "A4"],
        subdivision,
      ).start(),
    ];
    setSequences((prevSequences) => {
      prevSequences?.forEach((sequence) => {
        sequence.stop();
        sequence.dispose();
      });

      return newSequences;
    });
  }, [steps, subdivision]);

  useEffect(() => {
    console.log(stepIndex);
  }, [stepIndex]);

  return (
    <main className="flex flex-col items-center space-y-10 justify-center p-10">
      <div className="flex items-end space-x-10">
        <Button
          onClick={HandlePlayPause}
          text={isPlaying ? "Stop Sequence" : "Start Sequence"}
          className={"w-36 " + (isPlaying ? "bg-accent2Dark" : "")}
        />
        <div className="flex flex-col space-y-2 items-center justify-center">
          <h3>Subdivision</h3>
          <div className="flex items-center space-x-2 justify-center">
            <Button
              className={subdivision === "4n" ? "bg-accent2Dark" : ""}
              onClick={handleSubdivisionChange}
              text="1/4"
            />
            <Button
              className={subdivision === "8n" ? "bg-accent2Dark" : ""}
              onClick={handleSubdivisionChange}
              text="1/8"
            />
            <Button
              className={subdivision === "16n" ? "bg-accent2Dark" : ""}
              onClick={handleSubdivisionChange}
              text="1/16"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3 items-center justify-center">
          <h3>Note Select</h3>
          <select
            className="flex p-2 rounded-lg bg-accent1Dark items-center justify-center"
            value={currentNote}
            onChange={handleNoteChange}
          >
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div className="flex flex-col space-y-3 items-center justify-center">
          <h3>Octave Select</h3>
          <select
            className="p-2 rounded-lg bg-accent1Dark flex items-center justify-center"
            value={currentOctave}
            onChange={handleOctaveChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
      </div>

      <SequenceRow
        rowName="Percussion"
        rowIndex={0}
        handleNoteChange={handleStepClick}
        notes={steps[0]}
        isPlaying={isPlaying}
        currentStep={stepIndex}
      />

      <SequenceRow
        rowName="Mono Synth"
        rowIndex={1}
        handleNoteChange={handleStepClick}
        notes={steps[1]}
        isPlaying={isPlaying}
        currentStep={stepIndex}
      />
    </main>
  );
}
