// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';

// export default function PetDetails(props) {
//   const [petDetail, setPetDetail] = useState([]);
//   const { currentUser } = useAuth();

//   // useEffect(() => {
//   //   Axios.get('http://localhost:3001/api/user', { params: { uid: currentUser.uid } }).then((response) => {
//   //     // console.log(response);
//   //     Axios.get(`http://localhost:3001/api/pet/get/${response.data[0].id}`, {
//   //       params: { user_id: response.data[0].id },
//   //     })
//   //       .catch((err) => {
//   //         // Below dammy data to be removed once database gets ready
//   //         setPetDetail({ id: 1, name: 'Pochi', age: 2, breed: 'shiba', weight: 5, height: 50 });
//   //         // console.log(petDetail);
//   //       })
//   //       .then((response) => {
//   //         console.log(response.data);
//   //         setPetDetail(response.data);
//   //         // console.log(petDetail);
//   //       })
//   //       .catch((err) => {
//   //         // Below dammy data to be removed once database gets ready
//   //         setPetDetail({ id: 1, name: 'Pochi', age: 2, breed: 'shiba', weight: 5, height: 50 });
//   //         console.log(petDetail);
//   //       });
//   //   });
//   // }, []);

//   // return (
//   //   <div>
//   //     {petDetail && petDetail[0] ? (
//   //       <div key={petDetail.id}>
//   //         <p>{petDetail[0] && console.log(petDetail.name)} </p>
//   //         <p>{petDetail[0] && petDetail[0].name} </p>
//   //         {/* <p>{petDetail[0].age}</p>
//   //         <p>{petDetail[0].breed} </p>
//   //         <p>{petDetail[0].weight}</p>
//   //         <p>{petDetail[0].height}</p> */}
//   //       </div>
//   //     ) : (
//   //       'Loading...'
//   //     )}
//   //   </div>
//   // );

//   return (
//     <div>
//       {petDetail && petDetail[0]
//         ? petDetail.map((val) => (
//             <div key={val.id}>
//               <p>{val.name} </p>
//               <p>{val.breed}</p>
//             </div>
//           ))
//         : 'Loading...'}
//     </div>
//   );
// }
