const difficultyModeService = async () => {
    const response = await fetch(
        "https://starnavi-frontend-test-task.herokuapp.com/game-settings"
    );
    return response
};

export default difficultyModeService
