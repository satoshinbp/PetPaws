import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// Commented out parts are for testing purpose only. To be removed.

export default function Members() {
  // const [name, setName] = useState('');
  // const [role, setRole] = useState('');
  // const [image, setImage] = useState('');
  // const [linkedin, setLinkedin] = useState('');
  // const [github, setGithub] = useState('');
  // const [behance, setBehance] = useState('');
  // const [newRole, setNewRole] = useState('');
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setMemberList(response.data);
      })
      .catch((err) => {
        // Below dammy data to be removed once database gets ready
        setMemberList([
          { id: 1, name: 'Noriaki Nishiyama', role: 'Project Manager' },
          { id: 2, name: 'Shinya Sato', role: 'Lead Developer' },
          { id: 3, name: 'Yoshiki Sakai', role: 'Developer' },
          { id: 4, name: 'Azusa Nakahashi', role: 'Developer' },
          { id: 5, name: 'Mahsa Shafiei', role: 'Designer' },
          { id: 6, name: 'Adele Nosova', role: 'Designer' },
          { id: 7, name: 'Golmher Jozifard', role: 'Designer' },
        ]);
      });
  }, []);

  // //insert new members
  // let data = {
  //   name: name,
  //   role: role,
  //   image_url: image,
  //   linkedin_url: linkedin,
  //   github_url: github,
  //   behance_url: behance,
  // };

  // const submitProfile = (e) => {
  //   Axios.post('http://localhost:3001/api/insert', data);
  //   //let component re-render once submitted
  //   setMemberList([...memberList, data]);
  // };

  // //delete members
  // const deleteProfile = (id) => {
  //   Axios.delete(`http://localhost:3001/api/delete/${id}`);
  // };

  // //update members profile
  // const updateProfile = (id) => {
  //   Axios.put('http://localhost:3001/api/update', {
  //     id: id,
  //     role: newRole,
  //   });
  //   setNewRole('');
  // };

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
              {/* <p>{val.linkedin_url}</p>
                <p>{val.github_url}</p>
                <p>{val.behance_url}</p>
                <button onClick={() => deleteProfile(val.id)}>Delete</button>
                <input
                  type="text"
                  id="updateInput"
                  onChange={(e) => setNewRole(e.target.value)}
                />
                <button onClick={() => pdateProfile(val.id)}>Update</button> */}
            </div>
          ))
        : 'Loading...'}
    </div>
  );
}
