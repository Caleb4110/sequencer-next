import { Instrument, StepsGrid } from "@types";
import * as Tone from "tone";

/*
 * Creates A sequence based on the params given.
 * @param {React.MutableRefObject<Tone.Sequence<any> | null>} masterSequence - The ref holding the master sequence.
 * @param {React.Dispatch<React.SetStateAction<number>>} setStepIndex - The useState setter for stepIndex.
 * @param {StepsGrid} stepsGrid - The grid of steps. 2D matrix with each row being an instrument.
 * @param {Instrument[]} - An array of instruments.
 * @param {numberOfSteps} - Required total number of steps in the sequencer.
 * @returns {void}
 */
export default function createSequence(
  masterSequence: React.RefObject<Tone.Sequence<any> | null>,
  setStepIndex: React.Dispatch<React.SetStateAction<number>>,
  stepsGrid: StepsGrid,
  instruments: Instrument[],
  numberOfSteps: number,
): void {
  masterSequence.current = new Tone.Sequence(
    (time, step: number) => {
      // A seperate function because we may want to add hat mutes later
      function triggerSample(
        instNum: number,
        note: string,
        isPitched: boolean,
      ) {
        // If the sample is pitched, we use the note from the step
        // Otherwise we use the default note (C4)
        instruments[instNum].sampler.triggerAttackRelease(
          isPitched ? note : "C4",
          "16n",
          time,
          1,
        );
      }

      for (let instNum = 0; instNum < instruments.length; instNum++) {
        const isPitched = instruments[instNum].isPitched;
        const isActive = stepsGrid[instNum][step];
        if (isActive) {
          triggerSample(instNum, isActive, isPitched);
        }
      }
      setStepIndex(step);
    },
    Array.from({ length: numberOfSteps }, (_, i) => i),
    "16n",
  ).start(0);
}
