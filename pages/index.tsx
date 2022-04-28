import { useEffect, useState } from "react"
import Login from "../components/login"
import useSWR, { Key, Fetcher } from 'swr'
import { fetcher } from "../components/utils/fetcher"
import Dashboard from "../components/dashboard"
import Layout from "../components/Layout"

const IndexPage = () => {

  const [status, setStatus] = useState("loading")
  const [token, setToken] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (id: String, secret: String) => {
    console.log({ id, secret });
    try {
      setError("")
      const response = await fetch("api/login", {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          secret
        })
      })
      console.log(response);

      const data = await response.json()

      if (data.statusCode === 400) throw data;
      window.localStorage.setItem("token", data.token)
      setToken(data.token)
      setStatus("dashboard")
    } catch (error) {
      console.log(error.message);
      setStatus("login")
      setError(error.message)
      window.localStorage.removeItem("token")
    }
  }




  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) return setStatus("login")
    if (token) {
      setToken(token)
      setStatus("dashboard")
    }
  }, [])

  if (status === "login") return <Login handleLogin={handleLogin} error={error} />
  if (status === "dashboard") return <Dashboard token={token} />
  return <Layout title="Loading..."><div className="sans indented">Loading...</div></Layout>

}

export default IndexPage
