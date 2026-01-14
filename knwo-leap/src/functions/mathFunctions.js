export function generateQuestion(mode) {
    let num1, num2, questionText, correctAnswer;

    // Helper to get random number
    const rand = (max, min = 1) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    switch (mode) {
        case "Addition":
            num1 = rand(100);
            num2 = rand(100);
            questionText = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;

        case "Subtraction":
            num1 = rand(100);
            num2 = rand(num1); // Ensures no negative numbers
            questionText = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;

        case "Multiplication":
            num1 = rand(10);
            num2 = rand(10);
            questionText = `${num1} x ${num2}`;
            correctAnswer = num1 * num2;
            break;

        case "Division":
            // To avoid decimals: multiply first, then divide
            num2 = rand(10); // The divisor
            correctAnswer = rand(10); // The result we want
            num1 = num2 * correctAnswer; // The big number
            questionText = `${num1} / ${num2}`;
            break;

        case "Powers":
            num1 = rand(10);
            const pwr = Math.random() > 0.5 ? 2 : 3;
            questionText = `${num1}${pwr === 2 ? "²" : "³"}`;
            correctAnswer = Math.pow(num1, pwr);
            break;

        case "ALL":
            const modes = [
                "Addition",
                "Subtraction",
                "Multiplication",
                "Division",
                "Powers",
            ];
            return generateQuestion(modes[rand(modes.length - 1, 0)]);
    }

    return {
        text: questionText,
        answer: correctAnswer,
        options: generateOptions(correctAnswer),
    };
}

// Helper to generate 4 multiple choice options
export function generateOptions(correct) {
    let options = new Set([correct]);
    while (options.size < 4) {
        let fake = correct + (Math.floor(Math.random() * 10) - 5);
        if (fake >= 0 && fake !== correct) options.add(fake);
    }
    // Shuffle the array
    return Array.from(options).sort(() => Math.random() - 0.5);
}
