const { async } = require('rxjs');
require('colors');
require('dotenv').config()

const {  leerInput,
     inquirerMenu,
      pausa,
       listarLugares
     } = require('./helpers/inquirer');

const Busquedas = require('./models/busquedas');

const main = async() => {
    
    let opcion;
    const busquedas = new Busquedas();

    do{
        
        opcion = await inquirerMenu();
        
        switch ( opcion ) {
            case 1:

                const terminoBusqueda = await leerInput('Ciudad: ');
                
                const lugares = await busquedas.ciudad( terminoBusqueda );
                
                const id = await listarLugares( lugares );

                if ( id === '0') continue;

                const lugarSel = lugares.find( lugar => lugar.id === id);
                

                busquedas.agregarHistorial(lugarSel.nombre);
                

                const clima = await busquedas.climaLugar(lugarSel.ltd, lugarSel.lng);
    

                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', `${lugarSel.nombre}`.green );
                console.log('Latitud:', lugarSel.ltd);
                console.log('Longitud:', lugarSel.lng );
                console.log('Tiempo:', `${clima.desc}`.green );
                console.log('Temperatura:', clima.temp, 'ºC'.yellow );
                console.log('Temp. mininma:', clima.min, 'ºC'.yellow );
                console.log('Temp. maxima:', clima.max, 'ºC'.yellow  );
            break;

            case 2:
                console.clear();

                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1}.`.green;
                    console.log(`${ idx } ${lugar}`); 
                });
            break;
        }


        if (opcion !== 0) await pausa();
        
    }while( opcion !== 0);


}

main();