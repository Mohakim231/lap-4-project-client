import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css'

import { Calendar, ImageUpload } from '../../Components';

const ServiceProfilePage = () => {

    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState({});
    const {userId} = useParams()
    const navigate = useNavigate()
    const[calendar, setCalendar] = useState(false)
const[upload, setUpload]= useState(false)

    useEffect(() => {

        setLoading(true);
        async function loadProvider() {
console.log(userId)
            const response = await fetch(`http://localhost:5000/services/profile/${userId}`);
            const data = await response.json();
            setProvider(data);
            console.log(data)
            setLoading(false);
            const res = await fetch(`http://localhost:5000/service/calendar/${userId}`)
            if(res.status === 201){
                const dat = await res.json()
                console.log(dat.calendar)
                setCalendar(dat.calendar)
            }
        };

        updateCalendar()
        loadProvider();

    }, [calendar])


    const handleDeleteButton = async () => {
        console.log("in")
        const options = {
        method:"GET"
        }
        const response = await fetch(`http://localhost:5000/services/providers/delete/${userId}`, options)
        console.log('response', response)
        if (response.status === 201) {
           
            navigate("/")
        }

    }
    const handleCalendar =async ()=>{
       await setCalendar(!calendar)
      
    }
    const updateCalendar = async ()=>{
        console.log(calendar)
        const options = {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sp_id : userId,
                calendar:calendar
            })
        }
        const response = await fetch('http://localhost:5000/service/add-calendar', options)
        const data = await response.json()
console.log(data)
    }

function showUpload(){
setUpload(true)
}
const handleUpload=()=>{
    setUpload(false)
 }

    function displayProvider() {
        return (<>
        <div className='prov-card profile-card'>
            <div id='delete-account'>
                <button onClick={handleDeleteButton} >Delete account</button>
            </div>
        
            <div className='details-and-filters'>
                {/* <h2>Your Company:</h2>     */}
                <div className='provider-info profile-page-details-holder'>
                    <h2 className='company-name'>{provider.name}</h2> 
                    <h3>Address:</h3>
                    <h4>{provider.address }</h4>
                    <h4>{provider.city}</h4>
                    <h4>{provider.postcode}</h4>
                    <h5>Contact number: {provider.phone}</h5> 
                </div>

                <div className='all-services'>
                    <h5>Your services:</h5>
                    <p className="details-holder">
                        
                        { provider.daily_care? <img src="../../daycare.png" alt="daycare" className='icons'/> : ""}
                        { provider.boarding_hotel ? <img src="../../pet-hotel.png" alt="grooming" className='icons'/> : ""}
                        { provider.pet_sitter ? <img src="../../dog_sitter3.png" alt="sitting" className='icons'/> : ""}
                        { provider.dog_walker ? <img src="../../dog_walker.png" alt="walking" className='icons'/> : ""}
                        { provider.grooming ? <img src="../../dog_groomer.png" alt="grooming" className='icons'/> : ""}
                        { provider.vet ? <img src="../../vet.png" alt="vet" className='icons'/> : ""}
                        { provider.trainer ? <img src="../../dog_trainer.png" alt="training" className='icons'/> : ""}

        </p>
        <button onClick={showUpload}>Add photo</button>
        {upload? <ImageUpload handleUpload={handleUpload}/> : ''}
<button onClick={handleDeleteButton}>Delete account</button>
 
                        {/* <button onClick={() => vote(id, 1)}>+</button>
                        <button onClick={() => vote(id, -1)}>-</button> */}
                        
                    
                    <h5>Animals you provide for:</h5>
                    <p className="details-holder">
                        
                        { provider.dog? <img src="../../dog-icon.png" alt="dog" className='icons'/> : ""}
                        { provider.cat ? <img src="../../cat-icon.png" alt="cat" className='icons'/> : ""}
                        { provider.bird ? <img src="../../bird.png" alt="bird" className='icons'/> : ""}
                        { provider.rabbit ? <img src="../../rabbit.png" alt="rabbit" className='icons'/> : ""}
                        { provider.reptile ? <img src="../../reptile-icon.png" alt="reptiles" className='icons'/> : ""}

                    </p>
                </div>
            </div>
        
        
        
        <button onClick={handleCalendar} className='avail-btn'>Select availability</button>   
        
   
        <br></br>
    </div>
    <div className='calendar'>
      {calendar? <Calendar userId = {userId}/>:''}  
    </div>
    </>)
    
        
    }

    return loading ? 
        <div className="paw-prints">
            <h2 className='loading'>Loading...</h2>
            <div className="paw-print-1">
               <img className="pad" src="../../../paw.png" alt="paw" />
            </div>
                
            <div className="paw-print-2">
                <img src="../../../paw.png" alt="paw" className="pad"/>
            </div>    
                
            <div className="paw-print-3">
            <img src="../../../paw.png" alt="paw" className="pad"/>
            </div>    
                
            <div className="paw-print-4">
            <img src="../../../paw.png" alt="paw" className="pad"/>
            </div>

            
                
            <div className="paw-print-5">
            <img src="../../../paw.png" alt="paw" className="pad"/>
            </div>
                
            <div className="paw-print-6">
            <img src="../../../paw.png" alt="paw" className="pad"/>
            </div>
                
            <div className="paw-print-7">
            <img src="../../../paw.png" alt="paw" className="pad"/>
            </div>

            <div className="paw-print-8">
            <img src="../../../paw.png" alt="paw" className="pad"/>
            </div>
        </div> 
    : 
    <div className="provider-profile">
        {displayProvider()}
    </div>
    



};

export default ServiceProfilePage;
