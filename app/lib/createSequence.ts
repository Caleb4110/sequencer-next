import { Instrument, Sequences } from "../types/types";
import * as Tone from "tone";

export default function createSequence(
  masterSequence: React.MutableRefObject<Tone.Sequence<any> | null>,
  setStepIndex: React.Dispatch<React.SetStateAction<number>>,
  sequences: Sequences,
  instruments: Instrument[],
): void {
  masterSequence.current = new Tone.Sequence(
    (time, step: number) => {
      // A seperate function because we may want to add hat mutes later
      function triggerSample(instNum: number) {
        instruments[instNum].sampler.triggerAttackRelease("C4", "16n", time, 1);
      }

      for (let instNum = 0; instNum < instruments.length; instNum++) {
        const isActive = sequences[instNum][step];
        if (isActive) {
          triggerSample(instNum);
        }
      }

      setStepIndex(step);
    },
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "16n",
  ).start(0);
}
