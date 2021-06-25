import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import Axios from 'axios';

function Members() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [behance, setBehance] = useState('');
  const [memberList, setMemberList] = useState([]);
  const [newRole, setNewRole] = useState('');

  //display member list
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMemberList(response.data);
    });
  }, [memberList]);

  //insert new members
  let data = {
    name: name,
    role: role,
    image_url: image,
    linkedin_url: linkedin,
    github_url: github,
    behance_url: behance,
  };

  const submitProfile = (e) => {
    Axios.post('http://localhost:3001/api/insert', data);
    //let component re-render once submitted
    setMemberList([...memberList, data]);
  };

  //delete members
  const deleteProfile = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  //update members profile
  const updateProfile = (id) => {
    Axios.put('http://localhost:3001/api/update', {
      id: id,
      role: newRole,
    });
    setNewRole('');
  };

  return (
    <div className="App">
      <h1>Team Members</h1>
      <div className="form">
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

        {memberList &&
          memberList.map((val) => {
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
      </div>
    </div>
  );
}

export default Members;
