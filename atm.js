import readline from 'readline';
import { accessSync, readFileSync, writeFileSync } from 'fs';



const filePath = `${process.cwd()}/atm.json`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

accessSync(filePath);
const jsonObject = readFileSync(filePath, 'utf8');
const decodedObject = JSON.parse(jsonObject);
console.log(`Current balance: ${decodedObject.balance} Eur `);

const atmAction = (actionToDo, amount) => {
    try {
        accessSync(filePath);
        const jsonObject = readFileSync(filePath, 'utf8');
        const decodedObject = JSON.parse(jsonObject);
        if ((actionToDo === '-') && (amount > decodedObject.balance)) {
            console.log(`Whoops! Insufficient funds! Try again and check for the available funds!`)
            return;
        } else if ((actionToDo === '-')) {
            decodedObject.balance -= amount;
            writeFileSync(filePath, JSON.stringify(decodedObject));
        } else {
            decodedObject.balance += amount;
            writeFileSync(filePath, JSON.stringify(decodedObject));
        }

        console.log(`The current balance is: ${decodedObject.balance} Eur`);

    } catch (err) {
        console.error('Something went wrong', err);
    }
}

rl.question('Would you like to deposit (+) or take-out (-) the money?: ', (actionToDo) => {
    if ((actionToDo != '+') && (actionToDo != '-')) {
        console.log("Woops! Let's restart! Please type either '+ or '-'!");
        rl.close();
        return;

    } else if (actionToDo === '+') {
        rl.question('How much would you like to deposite?: ', (amount) => {
            atmAction(actionToDo, parseInt(amount));
            rl.close();
        });
    } else {
        rl.question('How much would you like to take out?: ', (amount) => {
            atmAction(actionToDo, parseInt(amount));
            rl.close();
        });
    };
});