import Link from 'next/link'
import Layout from '../Layout'

interface InfoProps {
}

export default function Info() {


    return (
        <>
            <h1 className='sans'>
                Application de suivi de ses dépenses
            </h1>
            <p className="sans">A partir d'une base de données <a target='_blank' href="https://notion.so">notion.so</a> cette application te permet de visualiser et suivre tes dépenses.</p>
            <div>
                <img src="images/exemple.JPG" alt="Exemple" />
            </div>

            <p className="sans">Graphique en bar pour les dépenses alimentaires mensuelles par année</p>
            <br />
            <div>
                <img src="images/database.JPG" alt="Exemple" />
            </div>
            <p className="sans">Base de données notion associée</p>
            <br />
            <h2 className="sans">Démarrer</h2>
            <hr></hr>
            <h4 className="sans">Etape 1</h4>
            <p className="sans">
                Si tu n'as pas de compte Notion, crée en toi un : <a className="sans link" target='_blank' href="https://www.notion.so/signup">Créer un compte notion</a>
            </p>
            <h4 className="sans">Etape 2</h4>
            <p className="sans">
                Tu dois créer une page base de données ou data table en anglais. Donne lui un titre (Dépenses par exemple) et un emoji.
            </p>
            <h4 className="sans">Etape 3</h4>
            <p className="sans">
                Dans cette table il faut que tu renomes la propriété principale (souvent "Name") par <b>"Nom"</b>.
            </p>
            <h4 className="sans">Etape 4</h4>
            <p className="sans">
                Toujours dans cette table tu vas ajouter 3 propriétés dont il faut absolument que tu respectes le format.
            </p>
            <p className="sans">
                Les proporiétés à ajouter sont :
            </p>
            <ul>
                <li className="sans"><b>"Date"</b> (au format date)</li>
                <li className="sans"><b>"Montant"</b> (au format nombre dans la devise que tu souhaites)</li>
                <li className="sans">Dans le but de classer tes dépenses par tags tu peux ajouter la propriété <b>"Tags"</b> (au format sélection unique)</li>
            </ul>
            <h4 className="sans">Etape 5</h4>
            <p className="sans">
                Il s'agit maintenant d'ouvrir ta base de données sur internet pour que cette application puisse y avoir accès. Rend toi alors sur <a target='_blank' href="https://www.notion.so/my-integrations">https://www.notion.so/my-integrations</a>

            </p>
            <h4 className="sans">Etape 6</h4>
            <p className="sans">
                Créer une nouvelle intégration en lecture seule. Sauvegarde l'"Internal Integration Token".
            </p>
            <h4 className="sans">Etape 7</h4>
            <p className="sans">
                L'intégration créées, tu vas maintenant la relier à ta base de données. Rends toi sur la page de ta base de données.
                Une fois sur la page, en haut à droite cliques sur "Share", puis "Invite" et enfin invite ton intégration à rejoindre le partage des données de cette base.
                Concerves l'ID de la base.
            </p>
            <h4 className="sans">Etape 8</h4>
            <p className="sans">
                Ta base est bien ouverte. Tu peux dès maintenant te connecter avec l'ID de la base et le token secret de l'intégration.
            </p>
            <h4 className="sans">Etape 9</h4>
            <p className="sans">
                Depuis Notion, ajoutes tes dépenses. Recharges cette page pour afficher les changements.
            </p>
        </>
    )


}
