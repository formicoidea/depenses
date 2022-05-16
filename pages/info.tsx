import { useEffect, useState } from "react"
import Login from "../components/login"
import useSWR, { Key, Fetcher } from 'swr'
import { fetcher } from "../components/utils/fetcher"
import Dashboard from "../components/dashboard"
import Layout from "../components/Layout"
import Info from "../components/dashboard/info"

const InfoPage = () => {

    return <Layout title="Info">
        <div className="sans indented">
            <h1>Liste des améliorations</h1>
            <ul>
                <li>Exclure automatiquement les dépenses qui sont supérieur à plus de deux écarts type de la moyenne mensuelle</li>
                <li>Ajouter une propriété de prise en compte de la dépense dans le notion</li>
                <li>Filtrer en fonction de cette propriété marqueuse</li>
                <br />
                <li>Intégrer à tricount</li>
                <li>Intégrer à la caisse d'épargne</li>
            </ul>
            <Info />
        </div>
    </Layout>

}

export default InfoPage
