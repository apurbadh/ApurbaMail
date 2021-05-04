import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function SendMail(){
    const formSubmitted = (e) => {
        e.preventDefault()
        let children = e.target.children
        let to = children[0].children[1].value;
        let title = children[1].value;
        let desc = children[3].children[0].value;
        axios.post("http://localhost:3000/api/send", {
            to : to,
            title: title,
            desc: desc,
        }).then((res) => {
            Swal.fire(
                res.data.mes,
                res.data.ht,
                res.data.status
            )
            if (res.data.status === "success"){
                children[0].children[1].value = " "
                children[1].value = " "
                children[3].children[0].value = " "
            }
        })

    }
    return <div>
        <h1>Send Mail</h1>
    <br/>
    <br/>
    <form onSubmit={(e) => formSubmitted(e)}>
        <div className="input-group mb-3" style={{textAlign:"left"}}>
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username"
               aria-describedby="basic-addon1" width="500px" required/>
         </div>
        <input type="text" className="form-control" placeholder="Title" required/>
        <br/>
        <div className="form-group">
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={6} required/>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
    </form>
    </div>
}
