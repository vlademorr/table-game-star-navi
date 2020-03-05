const origin = 'https://starnavi-frontend-test-task.herokuapp.com';

export default () => {
    return {
        getWinners: async () => {
            const response = await fetch(`${origin}/winners`);
            return response
        },
        setWinners: async (player) => {
            const response = await fetch(`${origin}/winners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    winner: player,
                    date: (new Date()).toLocaleString()
                })
            });
            return response
        }
    }
};

