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
          { name: 'Noriaki Nishiyama', role: 'Project Manager' },
          { name: 'Shinya Sato', role: 'Lead Developer' },
          { name: 'Yoshiki Sakai', role: 'Developer' },
          { name: 'Azusa Nakahashi', role: 'Developer' },
          { name: 'Mahsa Shafiei', role: 'Designer' },
          { name: 'Adele Nosova', role: 'Designer' },
          { name: 'Golmher Jozifard', role: 'Designer' },
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

      {memberList.map((member) => (
        <div>
          <img src={member.image_url} alt="member portrait" />
          <div>{member.name}</div>
          <div>{member.role}</div>
        </div>
      ))}

      {/* The following part is for testing purpose only. To be removed. */}
      {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Role:</label>
        <input
          type="text"
          name="role"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <label>Image:</label>
        <input
          type="text"
          name="image_url"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <label>Linkedin:</label>
        <input
          type="text"
          name="linkedin_url"
          onChange={(e) => {
            setLinkedin(e.target.value);
          }}
        />
        <label>Github:</label>
        <input
          type="text"
          name="github_url"
          onChange={(e) => {
            setGithub(e.target.value);
          }}
        />
        <label>Behance:</label>
        <input
          type="text"
          name="behance_url"
          onChange={(e) => {
            setBehance(e.target.value);
          }}
        />
        <button onClick={submitProfile}>Add</button>

        {memberList.map((val) => {
          return (
            <div className="card" key={val.id}>
              <h1>{val.name} </h1>
              <p>{val.role}</p>
              <p>{val.image_url}</p>
              <p>{val.linkedin_url}</p>
              <p>{val.github_url}</p>
              <p>{val.behance_url}</p>
              <button onClick={() => deleteProfile(val.id)}>Delete</button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewRole(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateProfile(val.id);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
