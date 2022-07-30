import React, { useEffect, useState } from "react";
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo, updateTodo, deleteTodo } from '../graphql/mutations'
import { getTodo, listTodos } from '../graphql/queries'




const intialstate = {id: '', name:'', preferences:[], createdAt:'', updatedAt:''};

function Dashboard(props){
    const [inputState, setInputState] = useState('');
    const [dbRes, setDbres] = useState(intialstate);
    const [siteState, setSiteState] = useState('waitingß');

    function pref_parser(val){
        var temp = val.trim().replace(/\s+/g, '').split(',');
        if(temp[0] === "") temp = [];
        console.log(temp);
        return temp;
    }

    async function updatePrefs(){
        try{
            const prefsToAdd = pref_parser(inputState);
            await API.graphql(graphqlOperation(createTodo, {input: {id: props.uname, name: props.uname, preferences: prefsToAdd}}));
        }catch (err) {console.log('uppdate err')}
    }

    useEffect(() => {
        fetchPrefs()
      }, [])

    async function fetchPrefs() {
        try {
          const prefData = await API.graphql(graphqlOperation(getTodo, { id: props.uname }))
          const pref = prefData.data.getTodo
          if(pref === null){
            setSiteState('default');
            return;
          }
          console.log(pref);
          setDbres(pref);
          setSiteState('user');
          console.log(dbRes);
        } catch (err) { console.log('fetch err') }
    }
    

    
        
        if(siteState === 'waiting'){
            return(<div></div>)
        }
        else if(siteState === 'default'){
            return(
                <div className="dashboard_container">
                    <div className="user_inputs">
                        <div>What do you want to look for?</div>
                        <input
                            type="text"
                            className="text-input"
                            value={inputState}
                            onChange={(e) => setInputState(e.target.value)}
                            placeholder="pizzeria, mall, gym..."
                        />
                        <button
                            className="update_btn"
                            onClick={()=>{updatePrefs()}}
                        > Update
                        </button>
                    </div>
                </div>
            )
        }
        else if(siteState === 'user'){
            return(
                <>
                <div className="user_pref">
                    <div>Your Preferences:</div>
                    <div className="pref_list">
                        {dbRes.preferences.map((elem)=>{
                            return <div key={elem} className="pref_elem"> {elem} </div>
                        })}
                    </div>
                </div>
                </>
            )
        }
}

export default Dashboard;