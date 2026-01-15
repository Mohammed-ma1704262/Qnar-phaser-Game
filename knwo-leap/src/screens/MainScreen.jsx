import { useEffect, useState } from "react";
import Phaser from "phaser";
import { PhaserGame } from "../PhaserGame";
import "../../styles/global.css";
import CustomButton from "../../components/CustomButton";
import { generateQuestion } from "../functions/mathFunctions.js";
import { startGame, gameCallbacks, resumeGame } from "./thirdGame.js";
import QuestionMenu from "./QuestionMenu";

function StartScreen() {
    const [showBody, setShowBody] = useState(true);
    const [showStartScreen, setshowStartScreen] = useState(true);
    const [showMainMenu, setshowMainMenu] = useState(false);
    const [showSubjects, setsshowSubjects] = useState(false);
    const [showMultiplicationChoices, setsshowMultiplicationChoices] =
        useState(false);
    const [showQuestionMenu, setsshowQuestionMenu] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [modeChoice, setmodeChoice] = useState("None");
    const [currentScene, setCurrentScene] = useState(null);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        // IMPORTANT: Use onChallengeRingPassed instead of onStarCollected
        gameCallbacks.onChallengeRingPassed = (scene) => {
            console.log("Challenge ring passed! Showing question...");
            setCurrentScene(scene);
            let q = generateQuestion(modeChoice);
            setCurrentQuestion(q);
            setsshowQuestionMenu(true);
        };

        gameCallbacks.onGameOver = (finalScore) => {
            console.log("Game Over! Score:", finalScore);
            setScore(finalScore);
            setIsGameOver(true);
        };
    }, [modeChoice]);

    function showMainMenu_swtich() {
        setshowStartScreen(false);
        setshowMainMenu(true);
        setsshowSubjects(false);
        setsshowMultiplicationChoices(false);
    }

    function showSubjectsMenu_switch() {
        setshowStartScreen(false);
        setshowMainMenu(false);
        setsshowSubjects(true);
        setsshowMultiplicationChoices(false);
    }

    function showMultiplicationChoices_switch() {
        setshowStartScreen(false);
        setshowMainMenu(false);
        setsshowSubjects(false);
        setsshowMultiplicationChoices(true);
    }

    function exit_button_swtich() {
        setshowStartScreen(true);
        setshowMainMenu(false);
        setsshowSubjects(false);
        setsshowMultiplicationChoices(false);
    }

    function handleModeChoosen(mode) {
        console.log("Mode chosen:", mode);
        setmodeChoice(mode);
        let q = generateQuestion(mode);
        setCurrentQuestion(q);

        // Hide ALL menus
        setsshowMultiplicationChoices(false);
        setShowBody(false);
        setshowStartScreen(false);
        setshowMainMenu(false);
        setsshowSubjects(false);

        // Start the Phaser game
        startGame();
    }

    function restartGame() {
        console.log("RESTART CALLED");
        setIsGameOver(false);
        setsshowQuestionMenu(false);
        setCurrentQuestion(null);

        gameCallbacks.onChallengeRingPassed = (scene) => {
            console.log("Challenge ring passed! Showing question...");
            setCurrentScene(scene);
            let q = generateQuestion(modeChoice);
            setCurrentQuestion(q);
            setsshowQuestionMenu(true);
        };

        gameCallbacks.onGameOver = (finalScore) => {
            setScore(finalScore);
            setIsGameOver(true);
        };

        startGame();
    }

    return (
        <>
            <div>
                {showBody ? (
                    <div className="w-200 h-150 grid place-items-center bg-gradient-to-b from-sky-400 to-blue-500">
                        {showStartScreen ? (
                            <div>
                                <CustomButton
                                    fullWidth
                                    textColor={"text-black"}
                                    color="bg-gray-300"
                                    label={"Start Game"}
                                    onClick={showMainMenu_swtich}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {showMainMenu ? (
                            <div
                                id="mainMenu"
                                className="grid place-items-center gap-4"
                            >
                                <div>
                                    <CustomButton
                                        fullWidth
                                        textColor={"text-black"}
                                        color="bg-gray-300"
                                        label={"New Game"}
                                        onClick={showSubjectsMenu_switch}
                                    />
                                </div>
                                <div>
                                    <CustomButton
                                        fullWidth
                                        textColor={"text-black"}
                                        color="bg-gray-300"
                                        label={"Options"}
                                        onClick={showMainMenu_swtich}
                                    />
                                </div>
                                <div>
                                    <CustomButton
                                        fullWidth
                                        textColor={"text-black"}
                                        color="bg-gray-300"
                                        label={"Exit"}
                                        onClick={exit_button_swtich}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {showSubjects ? (
                            <div
                                id="mainMenu"
                                className="grid place-items-center gap-4"
                            >
                                <div>
                                    <CustomButton
                                        fullWidth
                                        textColor={"text-black"}
                                        color="bg-gray-300"
                                        label={"Math"}
                                        onClick={
                                            showMultiplicationChoices_switch
                                        }
                                    />
                                </div>
                                <div>
                                    <CustomButton
                                        fullWidth
                                        textColor={"text-black"}
                                        color="bg-gray-300"
                                        label={"Science"}
                                    />
                                </div>
                                <div>
                                    <CustomButton
                                        fullWidth
                                        textColor={"text-black"}
                                        color="bg-gray-300"
                                        label={"To Main Screen"}
                                        onClick={exit_button_swtich}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {showMultiplicationChoices ? (
                            <div className="flex flex-col items-center gap-8 p-6">
                                <div
                                    id="mainMenu"
                                    className="grid grid-cols-2 gap-4 w-full max-w-2xl"
                                >
                                    <div>
                                        <CustomButton
                                            fullWidth
                                            textColor={"text-black"}
                                            color="bg-gray-300"
                                            label={"Addition"}
                                            onClick={() =>
                                                handleModeChoosen("Addition")
                                            }
                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            fullWidth
                                            textColor={"text-black"}
                                            color="bg-gray-300"
                                            label={"Subtraction"}
                                            onClick={() =>
                                                handleModeChoosen("Subtraction")
                                            }
                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            fullWidth
                                            textColor={"text-black"}
                                            color="bg-gray-300"
                                            label={"Multiplication"}
                                            onClick={() =>
                                                handleModeChoosen(
                                                    "Multiplication"
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            fullWidth
                                            textColor={"text-black"}
                                            color="bg-gray-300"
                                            label={"Division"}
                                            onClick={() =>
                                                handleModeChoosen("Division")
                                            }
                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            fullWidth
                                            textColor={"text-black"}
                                            color="bg-gray-300"
                                            label={"Simple Powers"}
                                            onClick={() =>
                                                handleModeChoosen("Powers")
                                            }
                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            fullWidth
                                            textColor={"text-black"}
                                            color="bg-gradient-to-r from-green-400 to-blue-500 animate-bounce hover:from-pink-500 hover:to-yellow-500"
                                            label={"Frenzy Mode (ALL)"}
                                            onClick={() =>
                                                handleModeChoosen("ALL")
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <CustomButton
                                        fullWidth
                                        textColor={"text-black"}
                                        color="bg-gray-300"
                                        label={"To Main Screen"}
                                        onClick={exit_button_swtich}
                                    />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}

                {/* Question Menu Overlay */}
                {showQuestionMenu && currentQuestion && (
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                        style={{ top: "300px", left: "400px" }}
                    >
                        <QuestionMenu
                            question={currentQuestion.text}
                            options={currentQuestion.options}
                            ans={currentQuestion.answer}
                            onAnswered={(isCorrect) => {
                                console.log(
                                    "Answer received:",
                                    isCorrect ? "CORRECT" : "WRONG"
                                );
                                setsshowQuestionMenu(false);
                                if (currentScene) {
                                    resumeGame(currentScene, isCorrect);
                                }
                            }}
                        />
                    </div>
                )}

                {/* Game Container */}
                {modeChoice !== "None" && (
                    <div
                        id="game-container"
                        className="absolute top-0 left-0"
                    ></div>
                )}

                {/* Game Over Screen */}
                {isGameOver && (
                    <div className="absolute top-30 left-60">
                        <div className="bg-gradient-to-b from-red-500 to-red-700 p-8 rounded-2xl text-center">
                            <h1 className="text-white text-5xl font-bold mb-4">
                                Game Over!
                            </h1>
                            <p className="text-white text-3xl mb-6">
                                Final Score: {score}
                            </p>
                            <CustomButton
                                textColor="text-black"
                                color="bg-gray-300"
                                label="Restart Game"
                                onClick={restartGame}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default StartScreen;
