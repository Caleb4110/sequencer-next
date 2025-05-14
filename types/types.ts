import * as Tone from "tone";

export type Steps = (string | null)[];

export type StepsGrid = Steps[];

export type Instrument = {
  id: number; // index of the instrument
  name: string; // The sample name
  url: string; // The filename of the sample ex. kick.wav
  isPitched: boolean; // If the sample is pitched
  sampler: Tone.Sampler; // A ToneJS sampler object
};

export type sampleData = {
  name: string; // Name of the sample for the sequencer
  url: string; // URL of the sample location
};
