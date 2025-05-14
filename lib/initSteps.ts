import { Steps } from "@types";

/*
 * Creates an empty array size 16
 * @returns {Steps} An array representing steps
 */
export function initSteps16(): Steps {
  return Array(16).fill(null);
}

/*
 * Creates an empty array size 8
 * @returns {Steps} An array representing steps
 */
export function initSteps8(): Steps {
  return Array(8).fill(null);
}
