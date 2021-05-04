import style from '../styles/Topbar.module.css'


function Topbar(props) {
    return (
        <nav className={style.nav} onClick={() => props.notshow(false)}>
            <ul className={style.ul}>
                <a className={style.a} onClick={()=> props.onc(0)}>
                    <li className={style.li}>All</li>
                </a>
                <a className={style.a} onClick={()=> props.onc(1)}>
                    <li className={style.li}>Received</li>
                </a>
                <a className={style.a} onClick={()=> props.onc(2)}>
                    <li className={style.li}>Sent</li>
                </a>
                <a className={style.a} onClick={()=> props.onc(3)}>
                    <li className={style.li}>Send Mail</li>
                </a>
                <a className={style.a} style={{float: "right"}} href="/logout">
                    <li className={style.li}>Logout</li>
                </a>
            </ul>
        </nav>
    );
}

export default Topbar;
