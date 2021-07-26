import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Team() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/team')
      .then((res) => {
        setMemberList(shuffle(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="team bg-secondary-fish">
      <div className="wrapper-lg">
        <h2 className="team__title">PET PAWS TEAM</h2>

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
