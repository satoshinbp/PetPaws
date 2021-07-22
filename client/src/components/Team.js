import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Team() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/team')
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="team bg-secondary-fish">
      <div className="wrapper-lg">
        <h3 className="team__title">PET PAWS TEAM</h3>
        <div className="team__members bg-secondary-light">
          {memberList
            ? memberList.map((val) => (
                <div key={val.id} className="team__member">
                  <div className="team__member-img">
                    <img src={val.image_url} alt="member portrait" />
                  </div>
                  <p className="team__member-name">{val.name}</p>
                  <p className="team__member-title">{val.role}</p>
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
}
