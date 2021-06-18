import React from 'react';

export default function Contac() {
  // Will be changed
  return (
    <>
      <div>
        <h1
          style={{
            border: '1px solid black',
            borderRadius: '5px',
            backgroundColor: '#F0F0F0',
          }}
        >
          Ask us a question!
        </h1>
      </div>
      <form>
        <div>
          <label htmlFor="">Your name</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Your email</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Your message</label>
          <br />
          <textarea />
        </div>
        <input type="submit" value="Send" />
      </form>
    </>
  );
}
