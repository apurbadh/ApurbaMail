import styles from '../styles/Home.module.css'
import Topbar from '../components/Topbar'
import {useState, useEffect, useMemo} from "react";
import MailTable from "../components/MailTable"
import SendMail from "../components/SendMail";
import Mail from "../components/Mail";
import {GetServerSideProps} from "next";
import {applySession} from "next-session"
import axios from "axios";

export default function Index(props) {

    const [the_mail, see_mail] = useState({from: "", title: "", description : "", to:""})
    const [seeMail, clicked] = useState(false);
    const [mails, changeMail] =useState([
    ])
    const mailClicked = (index : number) => {
        clicked(true)
        see_mail(mails[index])
    }
    const [mailType, changeMailType] = useState(0);
    useEffect(() =>{
        axios.post("http://localhost:3000/api/mail", {
                type : mailType
        }).then((res) => {
            changeMail(res.data.arr);
        })

    }, [mailType])
  return (
    <div>
        <Topbar onc={changeMailType} notshow={clicked} />
        <div className={styles.container}>
            {seeMail ?<Mail from={the_mail.from} to={the_mail.to} title={the_mail.title} desc={the_mail.description} onc={clicked}/> : mailType === 3? <SendMail/> : <MailTable content={mails} onc={mailClicked}/>}

        </div>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps = async ({req, res}) => {
    await applySession(req, res);
    // @ts-ignore
    let name = req.session.name;
    if (!name) {
        return {
            redirect: {
                destination: '/account',
                permanent: false,
            },
        }
    }
    return {
        props: {
            name : name
        }
    }
}
