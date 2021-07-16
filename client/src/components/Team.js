import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import catIcon from '../images/cat.svg';

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
    <div className="team">
      <h3 className="team__title">PET PAWS TEAM</h3>
      <div className="team__members">
        {memberList
          ? memberList.map((val) => (
              <div key={val.id} className="team__member">
                {/* <img src={val.image_url} alt="member portrait" className="team__member-img" /> */}
                <div className="team__member-img">
                  {/* to be replaced */}
                  <img src={catIcon} alt="member portrait" />
                </div>
                <p className="team__member-name">{val.name}</p>
                <p className="team__member-title">{val.role}</p>
              </div>
            ))
          : 'Loading...'}
      </div>
    </div>
  );
}
