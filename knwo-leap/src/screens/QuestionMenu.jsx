import CustomButton from "../../components/CustomButton";

import { useEffect, useState } from "react";

function QuestionMenu({ question, options, ans, onAnswered }) {
    const [ifAnswered, setIfAnswered] = useState(false);

    function checkChoosen(option) {
        const isCorrect = option == ans;
        console.log(isCorrect ? "CORRECT" : "WRONG");
        setIfAnswered(true);

        if (onAnswered) {
            onAnswered(isCorrect);
        }
    }

    return (
        <>
            {!ifAnswered ? (
                <div className="w-[300px] h-[250px] flex  flex-col items-center justify-center gap-6 p-8 bg-gradient-to-b from-green-400 to-lime-900 rounded-2xl shadow-2xl border-4 border-white/20">
                    {/* 1. THE QUESTION RECTANGLE */}
                    <div
                        id="question"
                        className="w-full h-16 flex items-center justify-center bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl shadow-inner"
                    >
                        <h2 className="text-white text-2xl font-black tracking-widest drop-shadow-md">
                            {question}
                        </h2>
                    </div>

                    {/* 2. THE CHOICES GRID (2 Columns) */}
                    <div id="choices" className="grid grid-cols-2 gap-4 w-full">
                        {options.map((option, index) => (
                            <div key={index}>
                                <CustomButton
                                    fullWidth
                                    textColor="text-black"
                                    color="bg-gray-200 hover:bg-white"
                                    label={option.toString()}
                                    className="h-20 text-2xl shadow-lg"
                                    onClick={() => checkChoosen(option)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default QuestionMenu;
