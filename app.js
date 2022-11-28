const qrcode = require('qrcode-terminal');
const fs = require("fs");
const { Client, Location, List, Buttons, LocalAuth, MessageMedia } = require('whatsapp-web.js');


// Path donde la sesión va a estar guardada
//NO ES NECESARIO
//const SESSION_FILE_PATH = './session.json';

// Cargar sesión en caso de que exista una ya guardada
//NO ES NECESARIO
//let sessionData;
//if(fs.existsSync(SESSION_FILE_PATH)) {
//    sessionData = require(SESSION_FILE_PATH);
//}

// Uso de valores guardados
// ¡LINEA MODIFICADA!
//const client = new Client({
//    authStrategy: new LegacySessionAuth({
//        session: sessionData
//    })
//});
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     }),
     puppeteer: ({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    //NO ES NECESARIO PERO SI QUIERES AGREGAS UN console.log
    //sessionData = session;
    //fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    //    if (err) {
    //        console.error(err);
    //    }
    //});
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

 
client.on('ready', () => {
    console.log('Client is ready!');
});


client.initialize();

client.on('message', async message => {
    
    const chat = await message.getChat();
    const contact = await message.getContact();

    const saludos = ["Hola", "hola", "hi", "Hi", "que tal", "Que tal", "alo", "buenas tardes", "Buenas tardes"];
    
    console.log(contact.id.user + ' -> ' + message.body);

    const media = await MessageMedia.fromUrl('https://media.giphy.com/media/HoqutG032LfMTDWZrx/giphy.gif');
 

    if(saludos.indexOf(message.body) > -1)
    {
        message.reply(`¿que tal? @${contact.number}!, mi nombre es David, ¿necesitas más detalles de lo que hacemos?`);
    }


    if(message.body === 'si' || message.body === 'Si') {
        client.sendMessage(message.from, 'bueno, en este link @zazu encontrarás más información de nuestra empresa');
        //chat.sendMessage(media);
        client.sendMessage(message.from, media ,{ sendVideoAsGif: true });
        message.react('👍');

        //let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
        //client.sendMessage(message.from, button);

        try {
        const media1 = MessageMedia.fromFilePath('./nueva_grabacion.mp3');
        client.sendMessage(message.from, media1 ,{ sendAudioAsVoice: true });

        } catch(e) {
            throw e;
        }

        try {
            const media2 = MessageMedia.fromFilePath('./CATALOGO.pdf');
            client.sendMessage(message.from, media2 ,{ sendMediaAsDocument: true });
    
            } catch(e) {
                throw e;
            }


        let button = new Buttons('Ejemplo de botones en Whatsapp',[{body:'Boton1'},{body:'Boton2'},{body:'Boton3'}],'Selecciona un botón!','zazu technology');
        client.sendMessage(message.from, button);


        //let sections = [{title:'sectionTitle',rows:[{title:'ListItem1', description: 'desc'},{title:'ListItem2'}]}];
        //let list = new List('List body','btnText',sections,'Title','footer');
        //client.sendMessage(message.from, list);

        const productsList = new List(
            "Lista de productos de ejemplo 50% off!!",
            "ver todos los productos",
            [
              {
                title: "Listado de Productos",
                rows: [
                  { id: "apple", title: "Manzana" },
                  { id: "mango", title: "Mango" },
                  { id: "banana", title: "Platano" },
                ],
              },
            ],
            "Seleccione uno!"
          );
          client.sendMessage(message.from, productsList);
    }

    //const paso_siguiente1 = ["Si", "si", "yes", "claro"];

    //if(paso_siguiente1.indexOf(message.body) > -1)
    //{
    ///    client.sendMessage(message.from, 'bueno, en este link @zazu encontrarás más información de nuestra empresa');
    //    client.sendMessage(media);
    //}


    //const paso_siguiente2 = ["no"];

    //if(paso_siguiente2.indexOf(message.body) > -1)
    //{
    //    message.reply(message.from, 'gracias por escribirnos, esperamos volver a verte pronto!');
    //    //chclientat.sendMessage(media);
    //}
    

    //if(message.body === '1') {
	//	client.sendMessage(message.from, 'bueno, en este link encontrarás más informacion de nuestra empresa');
    //}
});
 