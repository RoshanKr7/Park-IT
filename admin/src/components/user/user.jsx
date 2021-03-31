import React, {useState, useCallback, useLayoutEffect} from 'react';
import MaterialTable from 'material-table';

const {REACT_APP_API_BACKEND} = process.env;



function MyUser(){

  const [userStatus, setUserStatus] = useState([]); 

  const getUsers = useCallback(async () => {
    let requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
  };
  console.log(requestOption);
  let res = await fetch(`http://localhost:9000/admin/detail/get_user`, requestOption);
  console.log(res);
    if (res.status === 200) {
        let val = await res.json();
        console.log(val);
        setUserStatus(val);
    }
}, []);


useLayoutEffect(()=>{getUsers()}, userStatus);

  
    const column = [
        { title: 'First Name', field: 'FirstName'},
        { title: 'Last Name', field: 'LastName' },
        { title: 'Email', field: 'email'},
        { title: 'Rating', field: 'rating' }
    ]

    return(
        <div>
            <MaterialTable title = "User Status"
            data = {userStatus}
            columns={column}
            options={{
                pageSize: 10,
                exportButton: true,
                sorting: true,
                headerStyle: {
                  zIndex: 2,
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                rowStyle: {
                    "&:hover":{
                        backgroundColor: '#01579b',
                    }
                }
              }}
            />
        </div>
    );


}

export default MyUser;