const contentful = require('contentful-management');
const env = "master"

const client = contentful.createClient({
    space: 'space id',
    accessToken: 'acces token'
})

async function getComponentsByTag() {
    try {
        const space = await client.getSpace('Space id');
        const environment = await space.getEnvironment(env);
        let entries = [];
        let skip = 0; //Le nombre de composant qu'on veut skip (si skip = 100 on ignore les 100 premiers composants)
        const content_type = "genericPage" //le type de composant qu'on veux extraire
        let limit = 1000; //correspond au nombre de composants qu'on veut extraire
        let nombreDarticles = 0
        while (true) {
            const response = await environment.getEntries({ content_type, skip, limit });
            entries = entries.concat(response.items);
            if (response.items.length < limit) {
                break; // Si moins de 1000 entrées sont retournées, c'est qu'on a tout récupéré
            }
            skip += limit;
        }
        for (const entry of entries) {
            console.log(entry)
            if (entry.fields.pageType != undefined) { //Vérifier si le type de page est rempli
                if (entry.fields.pageType.fr.sys.id == '2W5uzJnYYnJNEc56iCQSeK') { //vérifier si le type de page corréspond au type "Actualité" (attention pas le méme id avec staging)
                    nombreDarticles++
                }
            }
        }
        console.log(nombreDarticles) //1481 ce qui corréspond au nombre de page générique de type Actualité du master



    } catch (error) {
        console.log(error)
    }
}
getComponentsByTag()