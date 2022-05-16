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
import Info from '../dashboard/info';

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
                    <Info />
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
                                >Connecter ma base</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
