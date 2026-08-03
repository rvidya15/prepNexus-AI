/**
 * Spaced Repetition System (SRS) Implementation
 * Adapted from the SuperMemo-2 (SM-2) algorithm.
 */

/**
 * Calculates the next review date and updated SRS variables based on user performance.
 * 
 * @param {number} quality - User's performance score (0 to 5)
 *                           0: Complete blackout
 *                           1: Incorrect, but remembered the correct answer
 *                           2: Incorrect, but seemed easy to recall
 *                           3: Correct, but required significant effort
 *                           4: Correct, after hesitation
 *                           5: Perfect response
 * @param {number} easeFactor - Previous ease factor (default is 2.5)
 * @param {number} interval - Previous interval in days (default is 0)
 * @param {number} repetitions - Previous number of successful repetitions (default is 0)
 * 
 * @returns {Object} { nextRevisionDate: Date, easeFactor: number, intervalDays: number, repetitionCount: number }
 */
const calculateNextReview = (quality, easeFactor = 2.5, interval = 0, repetitions = 0) => {
  let newRepetitions = repetitions;
  let newInterval = interval;
  let newEaseFactor = easeFactor;

  // If the user got it completely wrong (quality < 3)
  if (quality < 3) {
    newRepetitions = 0;
    newInterval = 1; // Reset to 1 day
  } else {
    // If the user got it right (quality >= 3)
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions += 1;
  }

  // Update Ease Factor (EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  // Hard floor for Ease Factor (minimum 1.3)
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }

  // Calculate the specific Date for the next revision
  const nextRevisionDate = new Date();
  nextRevisionDate.setDate(nextRevisionDate.getDate() + newInterval);

  return {
    nextRevisionDate,
    easeFactor: parseFloat(newEaseFactor.toFixed(3)),
    intervalDays: newInterval,
    repetitionCount: newRepetitions
  };
};

module.exports = {
  calculateNextReview
};
