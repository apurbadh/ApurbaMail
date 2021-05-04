import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Home.module.css'


interface MailProps{
    from: string;
    to : string;
    title: string;
    desc: string;
    onc: any;
}

export default function Mail(props : MailProps){
    return <div className={styles.container}>
        <h1>{props.title}</h1>
        <p>From : {props.from}</p>
        <p>To : {props.to}</p>
        <p>{props.desc}</p>
        <br/>
        <button className="btn btn-primary" onClick={() => props.onc(false)}>Back</button>
    </div>
}
