import readline from 'readline';
import { accessSync, readFileSync, writeFileSync } from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const filePath = `${process.cwd()}/name.json`;

try {
    accessSync(filePath);
    const jsonObject = readFileSync(filePath, 'utf8');
    const decodedObject = JSON.parse(jsonObject);
    console.log('--------------------');
    console.log(`The current name stored is: ${decodedObject.firstName}`);
    console.log('--------------------');
} catch (err) {
    console.error('Something went wrong', err);
}

rl.question('Please enter a new name: ', (answer) =>{
    storedName(answer);
    rl.close();
})

const storedName = (nameToAdd) => {
    try {
        accessSync(filePath);
        const jsonObject = readFileSync(filePath, 'utf8');
        const decodedObject = JSON.parse(jsonObject);
        decodedObject.firstName = nameToAdd;
        writeFileSync(filePath, JSON.stringify(decodedObject));
        console.log('--------------------');
        console.log(`The new name is: ${decodedObject.firstName}`);
        console.log('--------------------');
    } catch (err) {
        console.error('Something went wrong', err);
    }
};
