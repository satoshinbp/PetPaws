import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Team() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    Axios.get('https://pet-paws-langara.herokuapp.com/api/team')
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Team Members</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat sunt, nostrum recusandae quos perferendis
        quidem quo alias ex quisquam odio fugiat facere voluptates dignissimos, aspernatur repellendus sapiente quis
        cumque similique.
      </p>

      {/* The following part is for testing purpose only. To be removed. */}
      {memberList
        ? memberList.map((val) => (
            <div key={val.id}>
              <img src={val.image_url} alt="member portrait" />
              <p>{val.name} </p>
              <p>{val.role}</p>
            </div>
          ))
        : 'Loading...'}
    </div>
  );
}
