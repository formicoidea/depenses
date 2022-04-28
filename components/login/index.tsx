import Link from 'next/link'
import Layout from '../Layout'
import useSWR, { Key, Fetcher } from 'swr'
import ReactApexChart from '../chart';
import parseISO from 'date-fns/parseISO'
import getMonth from 'date-fns/getMonth'
import { colorPalette } from '../utils/theme';
import { format } from '../utils/numberFormat';
import { fetcher } from '../utils/fetcher';
import { useEffect, useState } from 'react';

interface LoginProps {
    handleLogin: (id: String, secret: String) => void;
    error: String
}
export default function Login({ handleLogin, error }: LoginProps) {

    const [id, setId] = useState("")
    const [secret, setSecret] = useState("")

    const labelStyle = {
        marginTop: "1rem",
    }
    const inputStyle = {
        marginTop: "1rem",
        lineHeight: "1.5",
        width: "100%"
    }
    const fieldStyle = {
        marginTop: "1em",
        width: "200px"
    }



    return (
        <Layout title="Bienvenu.e">
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
            }}>
                <div className="indented">
                    <h1 className='sans'>
                        Application de suivi de ses dépenses
                    </h1>
                    <p className="sans">A partir d'une base de donnée <a target='_blank' href="https://notion.so">notion.so</a> cette application te permet de visualiser et suivre tes dépenses.</p>
                    <h2 className="sans">Démarrer</h2>
                    <hr></hr>
                    <h4 className="sans">Etape 1</h4>
                    <p className="sans">
                        Si tu n'as pas de compte Notion, créées en toi un : <a className="sans link" target='_blank' href="https://www.notion.so/signup">Créer un compter notion</a>
                    </p>
                    <h4 className="sans">Etape 2</h4>
                    <p className="sans">
                        Tu dois créer une page base de données ou data table en anglais. Donne lui un titre (Dépenses par exemple) et un emoji.
                    </p>
                    <h4 className="sans">Etape 3</h4>
                    <p className="sans">
                        Dans cette table il faut que tu renomes la propriété principale (souvent "name") par <b>"Nom"</b>.
                    </p>
                    <h4 className="sans">Etape 4</h4>
                    <p className="sans">
                        Toujours dans cette table tu vas ajouter 3 propriétés dont il faut que tu respectes le format absolument.
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
                        Une fois sur la page, en haut à droite cliques sur "Share", puis "Invite" et enfin invite ton intégration à rejoindre le partage des données de cette base de données.
                        Concerve l'ID de la base.
                    </p>
                    <h4 className="sans">Etape 8</h4>
                    <p className="sans">
                        Ta base est bien ouverte. Tu peux dès maintenant te connecter avec l'ID de la base et le token secret de l'intégration.
                    </p>
                    <h4 className="sans">Etape 9</h4>
                    <p className="sans">
                        Depuis Notion, ajoute tes dépenses. Recharge cette page pour arfficher les changements.
                    </p>
                    <h2 className="sans">
                        Connexion
                    </h2>
                    <hr></hr>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <div style={{ width: "200px" }}>
                            {
                                error === "" ?
                                    (
                                        null
                                    ) :
                                    (
                                        <div
                                            className="sans highlight-red"
                                            style={fieldStyle}
                                        >{error}</div>
                                    )
                            }
                            <div style={fieldStyle}>

                                < label htmlFor="secret" className="sans" style={labelStyle}>Database id</label>
                                <input
                                    id="secret"
                                    className="input"
                                    type="text"
                                    style={inputStyle}
                                    value={id}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
                                ></input>
                            </div>
                            <div style={fieldStyle}>
                                < label htmlFor="secret" className="sans" style={labelStyle}>Token secret</label>
                                <input
                                    id="secret"
                                    className="input"
                                    type="password"
                                    style={inputStyle}
                                    value={secret}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecret(e.target.value)}
                                ></input>
                            </div>
                            <div style={fieldStyle}>
                            </div>
                            <div style={{
                                marginTop: "30px",
                                width: "200px"
                            }}>
                                <button
                                    className="sans"

                                    onClick={() => handleLogin(id, secret)}
                                >Connecter sa base</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
