var difficultWordWeight = 0.1579
var wordWeight = 0.0496
var difficultWordThreshold = 0.30
var percentage = 100
var adjustment = 3.6365

// Grade map associated with the scores.
var gradeMap = {
  4: [[0, 4], "< 4th Grade"],
  5: [[5, 6], "5-6th Grade"],
  6: [[7, 8], "7-8th Grade"],
  7: [[9, 10], "9-10th Grade"],
  8: [[11, 12], "11-12th Grade"],
  9: [[13, 15], "College"],
  10: [16, "College Graduate"],
  NaN: [Number.NaN, Number.NaN]
}


/**
 * @typedef {Object.<string, number>} DaleChallFormulaCounts
 * @property {number} sentence
 * @property {number} word
 * @property {number} difficultWord
 */

/**
 * Given the number of words (`word`), the number of sentences (`sentence`), and the number of unique unfamiliar words in a document (`difficultWord`), returns the score associated with the document.
 *
 * @param {DaleChallFormulaCounts} counts
 * @returns {number}
 */
export function daleChallFormula(counts) {
  /** @type {number} */
  var percentageOfDifficultWords
  /** @type {number} */
  var score


  if (!counts || !counts.sentence || !counts.word) {
    return Number.NaN
  }

  percentageOfDifficultWords = (counts.difficultWord || 0) / counts.word
  console.log("percentageOfDifficultWords" + percentageOfDifficultWords)

  score =
    difficultWordWeight * percentageOfDifficultWords * percentage +
    (wordWeight * counts.word) / counts.sentence

  if (percentageOfDifficultWords > difficultWordThreshold) {
    score += adjustment
  }
  console.log( "Score", score)

  return score
}

/**
 * Mapping between a dale-chall score and a U.S. grade level.
 *
 * @param {number} score
 */
export function daleChallGradeLevel(score) {
  var floored = Math.floor(score)

  if (floored < 5) {
    floored = 4
  } else if (floored > 9) {
    floored = 10
  }

  // eslint-ignore-next-line capitalized-comments
  // type-coverage:ignore-next-line
//   console.log( "Map 1" + gradeMap[floored[1]].concat() )
//   console.log( "Map 2" + (gradeMap[floored].concat()[1]) )

  return gradeMap[floored].concat()[1]
}

