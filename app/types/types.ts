import * as Tone from "tone";

export type Sequences = boolean[][];

export type Instrument = {
  id: number; // index of the instrument
  name: string; // The sample name
  url: string; // The filename of the sample ex. kick.wav
  sampler: Tone.Sampler;
};

export type sampleData = {
  name: string;
  url: string;
};
