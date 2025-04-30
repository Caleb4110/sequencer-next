import { Instrument, StepsGrid } from "@types";
import * as Tone from "tone";

export default function createSequence(
  masterSequence: React.MutableRefObject<Tone.Sequence<any> | null>,
  setStepIndex: React.Dispatch<React.SetStateAction<number>>,
  stepsGrid: StepsGrid,
  instruments: Instrument[],
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
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "16n",
  ).start(0);
}
