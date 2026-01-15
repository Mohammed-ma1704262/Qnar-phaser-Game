import CustomButton from "../../components/CustomButton";
import { useEffect, useState, useRef } from "react";

function QuestionMenu({ question, options, ans, onAnswered, timeLimit = 3}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(timeLimit);
    const hasCalledTimeout = useRef(false);

    useEffect(() => {
        // Reset timer when new question appears
        setTimeRemaining(timeLimit);
        hasCalledTimeout.current = false;

        // Start countdown
        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0.1) {
                    clearInterval(interval);
                    // Time's up - treat as timeout (no answer given)
                    if (
                        onAnswered &&
                        selectedAnswer === null &&
                        !hasCalledTimeout.current
                    ) {
                        hasCalledTimeout.current = true;
                        onAnswered("timeout");
                    }
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [question]);

    function checkChoosen(option) {
        if (selectedAnswer !== null) return; // Prevent multiple clicks

        const isCorrect = option == ans;
        console.log(isCorrect ? "CORRECT" : "WRONG");
        setSelectedAnswer(option);

        // Give brief visual feedback before calling callback
        setTimeout(() => {
            if (onAnswered && !hasCalledTimeout.current) {
                onAnswered(isCorrect);
            }
            // Reset for next question
            setSelectedAnswer(null);
        }, 500);
    }

    // Calculate color based on time remaining
    const getTimerColor = () => {
        if (timeRemaining > 3) return "text-green-400";
        if (timeRemaining > 1) return "text-yellow-400";
        return "text-red-500";
    };

    return (
        <>
            {/* Timer - Positioned outside and above the question box */}
            <div className="absolute top-[-60px] left-0 bg-black/80 px-4 py-2 rounded-lg border-2 border-white/30 shadow-xl z-[60]">
                <span
                    className={`text-3xl font-black ${getTimerColor()} drop-shadow-lg`}
                >
                    ⏱️ {timeRemaining.toFixed(1)}s
                </span>
            </div>

            <div className="w-[300px] h-[250px] flex flex-col items-center justify-center gap-6 p-8 bg-gradient-to-b from-green-400 to-lime-900 rounded-2xl shadow-2xl border-4 border-white/20 relative">
                {/* Question Rectangle */}
                <div
                    id="question"
                    className="w-full h-16 flex items-center justify-center bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl shadow-inner"
                >
                    <h2 className="text-white text-2xl font-black tracking-widest drop-shadow-md">
                        {question}
                    </h2>
                </div>

                {/* Choices Grid (2 Columns) */}
                <div id="choices" className="grid grid-cols-2 gap-4 w-full">
                    {options.map((option, index) => (
                        <div key={index}>
                            <CustomButton
                                fullWidth
                                textColor="text-black"
                                color={
                                    selectedAnswer === option
                                        ? option == ans
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        : "bg-gray-200 hover:bg-white"
                                }
                                label={option.toString()}
                                className="h-20 text-2xl shadow-lg"
                                onClick={() => checkChoosen(option)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default QuestionMenu;
