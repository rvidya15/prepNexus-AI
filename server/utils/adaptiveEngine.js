/**
 * Adaptive Mock Test Engine
 * Adjusts question difficulty dynamically based on real-time performance.
 */

/**
 * Calculates the next recommended difficulty level.
 * @param {number} currentDifficulty - The difficulty of the last question (1-10).
 * @param {boolean} isCorrect - Whether the user answered correctly.
 * @param {number} timeTakenSeconds - How long the user took to answer.
 * @param {number} idealTimeSeconds - The expected time to answer this question.
 * @returns {number} The new difficulty level (1-10).
 */
const calculateNextDifficulty = (currentDifficulty, isCorrect, timeTakenSeconds, idealTimeSeconds = 60) => {
  let newDifficulty = currentDifficulty;

  if (isCorrect) {
    // If they got it right very quickly, bump up difficulty by 2
    if (timeTakenSeconds < (idealTimeSeconds / 2)) {
      newDifficulty += 2;
    } else {
      newDifficulty += 1; // Standard bump
    }
  } else {
    // If they got it wrong, drop difficulty
    newDifficulty -= 1;
  }

  // Ensure bounds
  if (newDifficulty < 1) return 1;
  if (newDifficulty > 10) return 10;
  
  return newDifficulty;
};

module.exports = {
  calculateNextDifficulty
};
