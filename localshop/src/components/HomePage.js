import React from "react";
import {Card,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import landing from "../Assests/landing.jpg";



const Homepage=()=>{
    const navigate=useNavigate();
    const getStart=()=>{
        navigate('/signup')
    }
    return(
        <>
       <div className="container mt-3">
		<div class="row">
			<div class="col-lg-12">
				<div id="content">
                <Card.Img variant="top" src={landing} />
					<h1>Local Shop</h1>
					<h3>Exceeding your expectations</h3>
					<br></br>
					<Button class="btn btn-default btn-lg" onClick={getStart}><i class="fas fa-paw"></i> Get Started</Button>
				</div>
			</div>
		</div>
	</div>
        </>
    )
}
export default React.memo(Homepage);