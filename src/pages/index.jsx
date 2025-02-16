import Head from "next/head";
import Header from "../components/Header";
import Dashboard from "@/components/Dashboard";
import {useEffect, useState} from "react";
export default function Home() {
    const [assets, setAssets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getData = async () => {
        try{
            const data = await fetch(`/api/assets?${searchTerm}`);
            const media = await data.json();
            setAssets(media);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
    }, [searchTerm])

    const onHandleNewUpload = (asset) => {
        setAssets(prev => [asset,...prev])
    }

    return (
        <>
            <Head>
                <title>David's Storage</title>
                <meta name="description" content="The main page for David's Storage" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header onHandleNewUpload={onHandleNewUpload}/>
            <div className="main-container">
                <Dashboard assets={assets} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
        </>
    );
}
