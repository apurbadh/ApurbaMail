import axios from "axios";
import Swal from 'sweetalert2'
import Account from "../components/Account";
import {useState} from "react";
import {GetServerSideProps} from "next";
import {applySession} from "next-session";

export default function Accounts(props){

    const [login, register] = useState(true);
    const changeLogin = () => register(true);
    const changeRegister = () => register(false);
    const login_user = (e) => {
        e.preventDefault();
        let buttons = e.target.children[1].children;
        let username = buttons[0].value;
        let password = buttons[1].value;
        axios.post("http://localhost:3000/api/login", {
            username: username,
            password: password
        }).then(res => {
            Swal.fire(
                res.data.mes,
                res.data.ht,
                res.data.status
            ).then(() => {
                if (res.data.status === "success"){
                    window.location.pathname = "/";
                }


            })

        })


    }
    const register_user = (e) => {
        e.preventDefault();
        let regexForPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
        let buttons = e.target.children[1].children;
        let fullName = buttons[0].value;
        let username = buttons[1].value;
        let email = buttons[2].value;
        let password = buttons[3].value;
        let confirmPassword= buttons[4].value;
        if (fullName.length < 4){
            Swal.fire(
                'Error',
                'Invalid Full name',
                'error'
            )
            return;
        }
        if (username.length < 4){
            Swal.fire(
                'Error',
                'Username must be of minimum 4 letters',
                'error'
            )
            return;
        }
        if (password != confirmPassword){
            Swal.fire(
                'Error',
                "Password and Confirm Password doesn't match",
                'error'
            )
            return;
        }
        if (!regexForPassword.test(password)){
            Swal.fire(
                'Error',
                "Insecure Password",
                'error'
            )
            return;
        }
        axios.post("http://localhost:3000/api/register", {
            fullName: fullName,
            username: username,
            email: email,
            password: password
        }).then(res => {
            Swal.fire(
                res.data.mes,
                res.data.ht,
                res.data.status
            )
            if (res.data.status == "success"){
                buttons[0].value = "";
                buttons[1].value = "";
                buttons[2].value = "";
                buttons[3].value = "";
                buttons[4].value = "";
                register(true)
            }

        })



    }
    const loginArray = [["Username", "text"], ["Password", "password"]];
    const registerArray = [["Full Name", "text"], ["Username", "text"], ["Email", "email"], ["Password", "password"], ["Confirm Password", "password"]];
    return <div>
        {login ?<Account title="Login" input={loginArray} link={changeRegister} foot="Don't have an account?" button="Log in" onc={login_user}/> :
            <Account title="Register" input={registerArray} link={changeLogin} foot="Already have an account?" button="Register" onc={register_user}/>}
    </div>
}

export const getServerSideProps : GetServerSideProps = async ({req, res}) => {
    await applySession(req, res);
    // @ts-ignore
    let name = req.session.name | '';
    if (name) {
        return {
            redirect: {
                destination: '/',
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
