import {GetServerSideProps} from "next";
import {applySession} from "next-session";

export default function Logout(){
    return <div>

    </div>
}

export const getServerSideProps : GetServerSideProps = async ({req, res}) => {
    await applySession(req, res);
    try{
        // @ts-ignore
        req.session.destroy();
    }catch(err){

    }

    return {
        redirect: {
            destination: '/account',
            permanent: false,
            },
        }


}
