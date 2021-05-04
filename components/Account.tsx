import loginStyle from "../styles/Login.module.scss";
import Header from './Header'
import styles from '../styles/Home.module.css'


function Account(props) {
    let myarr = []
    props.input.forEach((item, index) =>{
        myarr.push(<input type={item[1]} placeholder={item[0]} className={loginStyle.input} key={index} required />)
    })
    return (
        <div className={styles.main}>
            {props.mes}
            <Header/>
            <form className={loginStyle.login} onSubmit={(e) => props.onc(e)}>
                <p className={loginStyle.title}>{props.title}</p>
                <div id="inputs">
                {myarr}
                </div>
                <a onClick={props.link} className={styles.acursor}>{props.foot}</a>
                <button className={loginStyle.button} type="submit">
                    <span>{props.button}</span>
                </button>
            </form>
        </div>
    );
}


export default Account;
