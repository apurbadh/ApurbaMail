import 'bootstrap/dist/css/bootstrap.min.css'

type Props = {content : {from: string, title: string, description:string}[], onc : any}

export default function MailTable(props : Props){
    return <table className="table table-striped table-hover" style={{width: "100%"}}>
        <colgroup>
            <col width="15%"/>
            <col width="85%"/>
        </colgroup>
        <thead>
            <tr>
                <th>From</th>
                <th>Title</th>
            </tr>
        </thead>
    <tbody>
            {props.content.map((c, i) => <tr style={{cursor: "pointer"}} key={i} onClick={() => props.onc(i)}><td>{c.from}</td><td>{c.title}</td></tr>)}

    </tbody>
    </table>
}
