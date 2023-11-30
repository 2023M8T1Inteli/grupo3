/**
 * Calculates the percentage of hits based on the total number of hits and mistakes.
 * 
 * @param {number} hits - The number of hits.
 * @param {number} mistakes - The number of mistakes.
 * @returns {number} - The calculated percentage of hits.
 */
function calc(hits, mistakes) {
    // Calculate the total number of attempts (hits + mistakes)
    var sum = hits + mistakes;

    // Calculate the percentage of hits
    return (hits / sum) * 100;
}

// Export the calc function for use in other modules
module.exports = calc;