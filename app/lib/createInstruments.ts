import * as Tone from "tone";
import { Instrument, sampleData } from "@types";

export function createInstruments(samples: sampleData[]): Instrument[] {
  return samples.map((sample, index) => {
    return {
      id: index,
      name: sample.name,
      url: sample.url,
      isPitched: sample.name === "Bass" ? true : false,
      sampler: new Tone.Sampler({
        urls: {
          C4: sample.url,
        },
        baseUrl: "/samples/",
      }).toDestination(),
    };
  });
}
