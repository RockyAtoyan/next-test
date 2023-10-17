import {GetServerSidePropsContext, NextPage} from "next";
import axios from "axios";
import styles from '@/styles/Home.module.css'
import Link from "next/link";
export const getServerSideProps = async ({}:GetServerSidePropsContext) => {
    const {data:users} = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users")
    if(!users){
        return {
            notFound:true
        }
    }

    return {
        props:{
            users
        }
    }
}

interface IUser {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    },
    "phone":string,
    "website": string,
    "company": {
        "name": string,
        "catchPhrase": string,
        "bs": string
    }
}
const Users : NextPage<{users:IUser[]}> = ({users}) => {
    return <>
        <h1>Users</h1>
        <Link href={'/'}>Home</Link>
        <div style={{display:"grid", gridTemplateColumns:'1fr 1fr 1fr'}}>
            {users.map(user => {
                return <div className={styles.card}>
                    <h1>{user.name}</h1>
                    <h2>{user.username}</h2>
                </div>
            })}
        </div>
    </>
}


export default Users