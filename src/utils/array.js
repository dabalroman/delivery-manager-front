/* eslint-disable no-unused-vars */

/**
 * Shuffle array
 * @param {[]} array
 * @return {[]}
 */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Check if two scalar arrays are identical
 * @param {[]} array1
 * @param {[]} array2
 * @return {boolean}
 */
export function areArraysEqual(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index])
}
