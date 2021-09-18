const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?\n',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const continuar = [
    {
        type: 'input',
        name: 'enter',
        message: `\nPresion ${'ENTER'.green} para continuar\n`
    }
];

const inquirerMenu = async() => {

    console.clear();

    console.log('============================'.green);
    console.log('    seleccione una opcion'.green);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    console.log('\n')
    await inquirer.prompt(continuar);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if (value.length === 0){
                    return 'por favor ingrese u valor';
                }
                return true;
            }
        }
    ]
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async( lugares = []) => {
   
    const choices = lugares.map( (lugar, i) => {
            
        const idx = `${i + 1}. `.green;

        return {
            value: lugar.id,
            name: `${ idx } ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    
    return id;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
}