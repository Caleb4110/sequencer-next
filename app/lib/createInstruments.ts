import * as Tone from "tone";
import { Instrument, sampleData } from "../types/types";

export function createInstruments(samples: sampleData[]): Instrument[] {
  return samples.map((sample, index) => {
    return {
      id: index,
      name: sample.name,
      url: sample.url,
      sampler: new Tone.Sampler({
        urls: {
          C4: sample.url,
        },
        baseUrl: "/samples/",
      }).toDestination(),
    };
  });
}
