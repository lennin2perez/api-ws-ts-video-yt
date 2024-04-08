import 'dotenv/config'
import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola' ).addAnswer('Buenas!! bienvenido')
/**
 * 
 */
const main = async () => {
    
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    if (provider.http) {
        // Aquí puedes utilizar la propiedad "http" sin que se produzca un error
        provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
          // Tu código aquí
          const body = req.body
          const message = body.message
          const mediaUrl = body.mediaUrl
          //console.log(body)
          //await bot.sendMessage('573016083120', 'mensaje tukusito1!', {})
          await bot.sendMessage(process.env.NUMBER.toString(), message, {
                 media: mediaUrl
          })
          //await bot.sendMessage(process.env.FRIENDNUMBER.toString(), 'mensaje tukusito!', {})
        res.end('esto es del server de polka')
        }));
    }
   
    await createBot ({
        flow: createFlow ([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main ()