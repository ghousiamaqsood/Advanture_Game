import inquirer from "inquirer";

class Player {
    name: string;
    fuel: number = 150;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 20;
    }

    fuelIncrease() {
        this.fuel += 30;
    }
}

class Opponent {
    name: string;
    fuel: number = 150;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 20;
    }
}

const main = async () => {
    const playerName = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Please Enter Your Name:",
    });

    const opponentChoice = await inquirer.prompt({
        name: "select",
        type: "list",
        message: "Select Your Opponent:",
        choices: ["Skeleton", "Alien", "Zombie"],
    });

    const player = new Player(playerName.name);
    const opponent = new Opponent(opponentChoice.select);

    do {
        const action = await inquirer.prompt({
            name: "opt",
            type: "list",
            message: "What would you like to do?",
            choices: ["Attack", "Drink portion", "Run for Your Life..."],
        });

        if (action.opt === "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                player.fuelDecrease();
                console.log(`${player.name} fuel is ${player.fuel}`);
                console.log(`${opponent.name} fuel is ${opponent.fuel}`);
                if (player.fuel <= 0) {
                    console.log("You Lose. Better luck next time!");
                    break;
                }
            } else {
                opponent.fuelDecrease();
                console.log(`${player.name} fuel is ${player.fuel}`);
                console.log(`${opponent.name} fuel is ${opponent.fuel}`);
                if (opponent.fuel <= 0) {
                    console.log("Congratulations! You are the Winner!");
                    break;
                }
            }
        } else if (action.opt === "Drink portion") {
            player.fuelIncrease();
            console.log(`You drink a Health Potion. Your fuel is ${player.fuel}`);
        } else if (action.opt === "Run for Your Life...") {
            console.log("You Lose. Better luck next time!");
            break;
        }
    } while (true);
};

main();