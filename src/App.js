import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState();
  const [error, setError] = useState('');

  const serveApiId = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await serveApiId("https://jsonplaceholder.typicode.com/posts/");
        const fetchPromises = posts.map(post =>
          serveApiId(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
        );

        const data = await Promise.all(fetchPromises);
        setData(data);
        // console.log(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div> {error} </div>
  }

  return (
    <div className="App">
      <table>
        <thead>
          <th>Id</th>
          <th>UserID</th>
          <th>Title</th>
          <th>Body</th>
        </thead>
        <tbody>
          {/* {
            data &&
            <tr >
              <td>{data.id}</td>
              <td>{data.userId}</td>
              <td>{data.title}</td>
              <td>{data.body}</td>
            </tr>
          } */}

          {data && data.map(user => (

            <tr key={user.id + user.userId}>
              <td>{user.id}</td>
              <td>{user.userId}</td>
              <td>{user.title}</td>
              <td>{user.body}</td>
            </tr>


          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
