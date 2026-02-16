const crypto = require('crypto');

/**
 * Generate a unique 6-character alphanumeric room code
 * Uses crypto for randomness to ensure collision resistance
 * @returns {string} 6-character uppercase alphanumeric code
 */
function generateRoomCode() {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar-looking chars (I, O, 0, 1)
    const codeLength = 6;
    let code = '';

    // Use crypto.randomInt for cryptographically secure random numbers
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        code += characters[randomIndex];
    }

    return code;
}

/**
 * Generate a unique room code with collision detection
 * @param {Function} checkExists - Async function to check if code exists in DB
 * @param {number} maxAttempts - Maximum retry attempts (default: 10)
 * @returns {Promise<string>} Unique room code
 */
async function generateUniqueRoomCode(checkExists, maxAttempts = 10) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const code = generateRoomCode();
        const exists = await checkExists(code);

        if (!exists) {
            return code;
        }

        console.log(`[RoomCode] Collision detected for ${code}, retrying... (${attempt + 1}/${maxAttempts})`);
    }

    throw new Error('Failed to generate unique room code after maximum attempts');
}

module.exports = {
    generateRoomCode,
    generateUniqueRoomCode
};
