import * as Tone from "tone";
import { Instrument, sampleData } from "@types";

/*
 * Creates the ToneJS sample objects based on the sample data given
 * @param {sampleData[]} samples - the list of sampleData objects.
 * @returns {Instrument[]} The array of instruments created.
 */
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
