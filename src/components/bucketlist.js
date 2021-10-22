import { Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "./bucketlist.css"
import { Header } from './common/header';


export const Bucketlist = (props) => {
    const[list , setList] = useState([])
    const[listData , setListData] = useState([])
    
    const history = useHistory();

    useEffect(() => {
        let fetchData = async () => {
          let listData = await fetch(`http://localhost:7070/bucketlist/bucketlist/${props.match.params.id}`);
          let Data = await listData.json();
          setListData([...Data]);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [listData]);
   
    return (
        <>
        <Header/>
            <div className="container">
                <div className="row my-5">
                    <div className="col-lg-12">
                        <h3>Every great dream begins with a dreamer 💫</h3>

                    </div>
                    <div className="col-lg-12">
                        <form onSubmit={async(e)=>{
                            e.preventDefault();
                            setList("");

                            let response = await fetch(
                                `http://localhost:7070/bucketlist/create-bucketlist/${props.match.params.id}`,
                                {
                                  method: "POST",
                                  body: JSON.stringify({
                                    list,
                                    email: props.match.params.id,
                                  }),
                                  headers: {
                                    authorization: window.localStorage.getItem("myToken"),
                                    "content-type": "application/json",
                                  },
                                }
                              );
              
                              let data = await response.json();
                              if (data.message === "BucketList Added") {
                                toast.success("BucketList Added")
                              } else if (data.message === "Invalid ID") {
                                toast.error("Invalid ID");
                                setTimeout(() => {
                                  history.push("/login");
                                }, 5000);
                              }
                            
                        }}>
                            <input type="text" className="form-control" placeholder="Create Bucketlist" value={list} onChange={(e)=> setList(e.target.value)} required />
                            <button className="btn btn-success rounded my-2">Add</button>
                        </form>

                    </div>
                </div>
                <div className="row py-4">
                    <div className="col-lg-12">
                        {
                            listData.map((list, index)=>{
                                let keyId = list._id;
                                console.log(keyId);
                                return(
                                    <div className="listdata">
                                        <ul>
                                             <li key={keyId.toString()}>{list.bucketList}
                                            <span><Delete sx={{color:red[900] , ml:2}} onClick={async ()=>{
                                                         await fetch(`http://localhost:7070/bucketlist/delete/${list.email}`,{
                                                             method:"DELETE"
                                                
                                                         });

                                                         setListData(listData.splice(index,0))

                                                    }} /></span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
